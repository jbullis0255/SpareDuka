const User= require('../models/user')

const ErrorHandler= require('../utils/errorHandler')
const catchAsyncError= require('../middleware/catchAsyncErrors')
const sendToken = require('../utils/jwtToken')
const sendEmail = require('../utils/sendEmail')

const crypto = require('crypto')
const cloudinary = require('cloudinary')

//register a user => /api/v1/users/

exports.registerUser = catchAsyncError(async(req,res,next) => {

    const result = await cloudinary.v2.uploader.upload(req.body.avatar,{
        folder: 'avatars',
        width:150,
        crop:'scale'

    })
    const{name,email,password} = req.body 

    const user = await User.create({
        name,
        email,
        password,
        avatar:{
           public_id:result.public_id,
           url:result.secure_url
       } 
    })
 
    sendToken(user, 200, res)
})

//login user => /api/v1/login
exports.loginUser = catchAsyncError(async(req,res,next)=>{
        const{email,password}= req.body

    //check if user details have been entered
    if(!email || !password){
        return next(new ErrorHandler('Please enter enail and password', 400))
    }

    //finding user in the database
    const user = await User.findOne({email}).select('+password')

    if(!user){
        return next(new ErrorHandler('Invalid email or password', 401))

    }

    //checks if password is correct or next
    const isPasswordMatched= await user.comparePassword(password)

    if(!isPasswordMatched){
        return next(new ErrorHandler('Invalid Password', 401))
    }

    sendToken(user, 200, res) 
})

//get currently logged in user => /api/v1/me

exports.getUserProfile = catchAsyncError(async(req,res,next)=>{

    const user = await User.findById(req.user.id)

    if(!user){
        return next(new ErrorHandler('User doesnt exist or Login', 404))
    }

    res.status(200).json({
        sucess: true,
        user
    })
})

//update Password => /api/v1/password/update

exports.updatePassword = catchAsyncError(async(req,res,next)=>{

    const user = await User.findById(req.user.id).select('+password')

    //check previous/old Password (compare method is from the user model)
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword)
    if(!isPasswordMatched){
        return next(new ErrorHandler('Old Password is incorrect', 400))
    }

    user.password = req.body.password;

    await user.save()

    sendToken(user, 200, res)

})

//update user profile => /api/v1/me/update
exports.updateProfile = catchAsyncError(async(req,res,next)=>{

    const newUserData={
        name: req.body.name,
        email: req.body.email
    }

    //update Avatar 
    if(req.body.avatar !== ''){
        const user = await User.findById(req.user.id)

        const image_id = user.avatar.public_id
        const res = await cloudinary.v2.uploader.destroy(image_id)

        const result = await cloudinary.v2.uploader.upload(req.body.avatar,{
            folder: 'avatars',
            width:150,
            crop:'scale'
    
        })

        newUserData.avatar= {
            public_id: result.public_id,
            url:result.secure_url
        }
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
    })
})

//forgot password => /api/v1/password/forgot
exports.forgotPassword = catchAsyncError(async(req,res,next)=>{

    const user = await User.findOne({email: req.body.email})

    if(!user){
        return next(new ErrorHandler('User not found with this Email'))
    }

    //if user exists, get reset token
    const resetToken = user.getResetPasswordToken()

    await user.save({validateBeforeSave: false})

    //create reset  password url
    const resetUrl= `${req.protocol}://${req.get('host')}/password/reset/${resetToken}`

    //message body
    const message =`Please reset your Password using:\n\n${resetUrl}\n\n If you have not requested this email, Please ignore it. Thank you`

    try {
        await sendEmail({
            email:user.email,
            subject: 'SpareDuka Password Recovery',
            message
        })
        res.status(200).json({
            success: true,
            message: `Email sent to: ${user.email}`
        })
    } catch (error) {
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined
        
        await user.save({validateBeforeSave: false})

        return next(new ErrorHandler(error.message,500))
    }
})

//Reset Password => /api/v1/password/reset/:token
exports.resetPassword= catchAsyncError(async(req,res,next)=>{
    //hash the url token(compare it with one in the database)
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

    //find user with the same token isPasswordMatched

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: {$gt: Date.now()}
    })

    if(!user){
        return next(new ErrorHandler('Password reset token is invalid or has expired', 400))
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler('Password does not match', 400))
    }

    //if they match, set new password
    user.password = req.body.password

    user.resetPasswordToken= undefined
    user.resetPasswordExpire= undefined

    await user.save()

    sendToken(user, 200, res)

})

//logout user => /api/v1/logout

exports.logout= catchAsyncError(async(req,res,next)=>{

    //deletecookie
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: 'Logged out'
    })
})

//ADMIN ROUTES

//get all users => /api/v1/admin/users
exports.allUsers = catchAsyncError(async(req,res,next)=>{
    const users = await User.find()

    res.status(200).json({
        success: true,
        count:users.length,
        users
    })
})

//get single user details => /api/v1/admin/user/:id
exports.getUserDetails = catchAsyncError(async(req,res,next)=>{
    const user = await User.findById(req.params.id)
    if(!user){
        return next(new ErrorHandler(`User with id ${req.params.id} not found `))
    }

    res.status(200).json({
        sucess:true,
        user
    })
})

//update user profile => /api/v1/admin/user/:id
exports.updateUser = catchAsyncError(async(req,res,next)=>{

    const newUserData={
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
    })
})

//delete user by admin => /api/v1/admin/user/:id
exports.deleteUser = catchAsyncError(async(req,res,next)=>{
    const user = await User.findById(req.params.id)
    if(!user){
        return next(new ErrorHandler(`User with id ${req.params.id} not found `))
    }
    //remove avatar from cloudinary - todo
    await user.remove()


    res.status(200).json({
        sucess:true,
    })
})


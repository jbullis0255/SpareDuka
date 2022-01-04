const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const Product= require('../models/product')
const ErrorHandler = require('../utils/errorHandler')
const APIFeatures = require('../utils/apiFeatures')


//create new product => /api/v1/admin/products/new
exports.newProduct = catchAsyncErrors(async(req,res,next) => {
      
    req.body.user= req.user.id
    
    const product = await Product.create(req.body)

    res.status(200).json({
        success: true,
        product
    })

})

//GET ALL PRODUCTS => /api/v1/products?keyword=engines
exports.getProducts= catchAsyncErrors(async(req,res,next)=>{
   
    const resPerPage = 16
    const productCount = await Product.countDocuments()

    const apiFeatures = new APIFeatures(Product.find(), req.query)
                        .search()
                        .filter()
    
    let products = await apiFeatures.query
    let filteredProductsCount = products.length

    let sellers=[]
    products.forEach(product =>{
        sellers = [...new Set(sellers.concat(product.seller))] 
    })  

     
  
 
    apiFeatures.pagination(resPerPage)
     products = await apiFeatures.query.clone()

        
        res.status(200).json({
            success: true,
            productCount,
            resPerPage, 
            filteredProductsCount,
            sellers,
            products
        })

} )

//Get SINGLE PRODUCT DETAILS => /api/v1/product/:ID
exports.getSingleProduct = catchAsyncErrors(async(req,res,next)=>{
   const product= await Product.findById(req.params.id)

   if(!product){
       return next(new ErrorHandler('Product not found', 404))
   }

   res.status(200).json({
       success:true,
       product
   })
})

//update product => /api/v1/admin/product/:ID
exports.UpdateProduct = catchAsyncErrors(async(req,res,next)=>{
    let product= await Product.findById(req.params.id)
    
   if(!product){
    return next(new ErrorHandler('Product not found', 404))
}
    product= await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        useFindAndModify:false,
        runValidators:true
    })

    res.status(200).json({
        success:true,
        product
    })
})

//delete product => /api/v1/admin/product/:ID
exports.deleteProduct = catchAsyncErrors(async(req,res,next)=>{
    const product = await Product.findById(req.params.id)

    if(!product){
        return next(new ErrorHandler('Product not found', 404))
    }
    await product.remove()

    res.status(200).json({
        sucess:true,
        message:'Product deleted successfully'
    })
 
})

//create reviews => /api/v1/review

exports.createProductReview = catchAsyncErrors(async(req,res,next)=>{
    const{rating, comment, productId} = req.body

    const review ={
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }

    const product = await Product.findById(productId)

    const isReviewed = product.reviews.find(
        r => r.user.toString() === req.user._id.toString()
        )

        if(isReviewed){
            product.reviews.forEach(review => {
                if(review.user.toString() === req.user._id.toString()){
                    review.comment = comment
                    review.rating = rating
                }
            })

        }else{
            product.reviews.push(review)
            product.numOfReviews = product.reviews.length
        }

        product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

        await product.save({validateBeforeSave: false})

        res.status(200).json({
            success:true
        })    
})

//get Product reviews => /api/v1/reviews
exports.getProductReviews = catchAsyncErrors(async(req,res,next)=>{
    const product = await Product.findById(req.query.id)

    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
})

//Delete Product review => /api/v1/reviews
exports.deleteReview = catchAsyncErrors(async(req,res,next)=>{
    const product = await Product.findById(req.query.productId)

    const reviews = product.reviews.filter(review => review._id.toString() !== req.query.id.toString())

    const numOfReviews = reviews.length

   const ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length
    
   await Product.findByIdAndUpdate(req.query.productId, {
       reviews,
       ratings,
       numOfReviews
   }, {
       new:true,
       runValidators: true,
       useFindAndModify: false
   })

    res.status(200).json({
        success: true,
       
    })
})
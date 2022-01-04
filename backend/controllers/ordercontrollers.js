const Order = require('../models/order')
const Product = require('../models/product')

const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const sendEmail = require('../utils/sendEmail')

//create a new order => /api/v1/order/new
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
    const {
      orderItems,
      deliveryInfo,
      itemsPrice,
      taxPrice,
      deliveryPrice,
      totalPrice,
      paymentInfo,
    } = req.body;
   
    const order = await Order.create({
      orderItems,
      deliveryInfo,
      itemsPrice,
      taxPrice,
      deliveryPrice,
      totalPrice,
      paymentInfo,
      paidAt: Date.now(),
      user: req.user._id,
      email: req.user.email
    });
   
    if(!order){
      return next(new ErrorHandler('Order not found'))
  }
   
    //message body
    const message =`Thank you for your order`
   
   
    try {
      await sendEmail({
          email:order.email,
          subject: 'SpareDuka Order Success',
          message
      })

  } catch (error) {
   
      return next(new ErrorHandler(error.message,500))
  }
   
  res.status(200).json({
    success: true,
    order,
  });
   
  });

//send user an email after an order
exports.emailOrder = catchAsyncErrors(async(req,res,next)=>{
 
    const order = await Order.findOne()
   
    if(!order){
        return next(new ErrorHandler('Order not found'))
    }
     console.log(order)
   
    await order.save()
   
   
    //message body
    const message =`Thanks for placing your order with us,If you didnt Please ignore this email. Thank you`
   
    try {
        await sendEmail({
            email:order.email,
            subject: 'SpareDuka Order Success',
            message
        })
      
        res.status(200).json({
            success: true,
            // message: `Email sent to: ${order.email}`
        })
    } catch (error) {
        
        await order.save()
   
        return next(new ErrorHandler(error.message,500))
    }
  })

//get single order => /api/v1/order/:id
exports.getSingleOrder = catchAsyncErrors(async(req, res, next)=>{
    const order = await Order.findById(req.params.id).populate('user','name email')

    if(!order){
        return next(new ErrorHandler('Order not found with this ID', 404))
    }

    res.status(200).json({
        success:true,
        count: order.length,
        order
    })

})

//get Loggedin user order => /api/v1/orders/me
exports.myOrders = catchAsyncErrors(async(req, res, next)=>{
    const orders = await Order.find({user: req.user.id})


    res.status(200).json({
        success:true,
        count: orders.length,
        orders
    })

}) 
//get all orders => /api/v1/admin/orders
exports.allOrders = catchAsyncErrors(async(req, res, next)=>{
    const orders = await Order.find()

    let totalAmount =0;
    orders.forEach(order =>{
        totalAmount += order.totalPrice
    })
    res.status(200).json({
        success:true,
        count: orders.length,
        totalAmount,
        orders
    })

}) 
//update and process orders => /api/v1/admin/order/:id
exports.updateOrder = catchAsyncErrors(async(req, res, next)=>{
    const order = await Order.findById(req.params.id)

    if(order.orderStatus === 'Delivered'){
        return next(new ErrorHandler('You have already delivered this order', 400))
    }

    order.orderItems.forEach(async item => {
        await updateStock(item.product, item.quantity)
    })

    order.orderStatus = req.body.status,
    order.deliveredAt = Date.now()

    await order.save()

    res.status(200).json({
        success:true,
    })

}) 

//updateStock function
async function updateStock(id, quantity){
    const product = await Product.findById(id)

    product.stock = product.stock - quantity

    await product.save({
        validateBeforeSave: false
    })
}

//delete order => /api/v1/admin/order/:id
exports.deleteOrder = catchAsyncErrors(async(req, res, next)=>{
    const order = await Order.findById(req.params.id)

    if(!order){
        return next(new ErrorHandler('Order not found with this ID', 404))
    }

    await order.remove()

    res.status(200).json({
        success:true,
       
    })

})
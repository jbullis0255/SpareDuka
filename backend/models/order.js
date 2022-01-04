const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    deliveryInfo:{
        address: {
            type: String,
            required: true
        },
        town: {
            type: String,
            required: true
        },
        phoneNo: {
            type: String,
            required: true
        },
        postalCode: {
            type: String,
            required: true
        },
        street: {
            type: String,
            required: true
        }
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    email:{
        type:mongoose.Schema.Types.String,
        ref:'User',
        required: true
    },
    orderItems:[
        {
            name:{
                type: String,
                required: true
            },
            quantity:{
                type: Number,
                required: true
            },
            price:{
                type: Number,
                required: true
            },
            image:{
                type: String,
                required: true
            },
            product:{
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref:'Product'
            },
            seller:{
                type: mongoose.Schema.Types.String,
                required: true,
                ref:'Product'
            }
        }
    ],
    paymentInfo:{
        id: {
            type: String
        },
        status:{
            type: String,
        }
    },
    paidAt:{
        type: Date
    },
    itemsPrice:{
        type:Number,
        required: true,
        default:0.0
    },
    taxPrice:{
        type:Number,
        required: true,
        default:0.0
    },
    deliveryPrice:{
        type:Number,
        required: true,
        default:0.0
    },
    totalPrice:{
        type:Number,
        required: true,
        default:0.0
    },
    orderStatus:{
        type:String,
        required:true,
        default:'Processing'
    },
    deliveredAt:{
        type: Date
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
    
})

module.exports = mongoose.model('Order', orderSchema)
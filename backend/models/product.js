const mongoose= require('mongoose')

const productSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please enter product name'],
        trim:true,
        maxLength:[100,'Product name cannot exceed 100 characters']
    },
    price:{
        type:Number,
        required:[true,'Please enter product price'],
        default: 0.0,
        maxLength:[100,'Product price cannot exceed 5 characters']
    },
    description:{
        type:String,
        required:[true,'Please enter product description'],
    },
    ratings:{
        type:Number,
        default:0
    },
    images:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true,
            }

    }
        ],
    category:{
        type:String,
        required:[true,'Please select category for this product'],
        enum:{
            values:[
                'Tyres and Rims',
                'Engines and More',
                'Car Batteries',
                'Lights and More',
                'Brakes and More',
                'Car Service ',
                'Exterior Parts',
                'Car Trackers',
                'Detailed Parts',
            ],
            message: 'Please select a correct category for this product'
        }
    },
    seller:{
        type:String,
        required:[true,'Please enter product seller']
    },
    stock:{ 
        type:Number,
        required:[true,'Please enter product stock'],
        maxLength:[5,'Product stock cannot exceed 5 characters'],
        default:0
    },
    numofReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref:'User',
                required:true
                },
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    user:{
        type:mongoose.Schema.Types.String, 
        ref:'User',
        required:true
        },
    createdAt:{
        type:Date,
        default:Date.now()
    } 

})

module.exports=mongoose.model('Product', productSchema)
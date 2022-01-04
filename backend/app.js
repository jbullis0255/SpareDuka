const express = require('express')
const cookieParser= require('cookie-parser')
const bodyParser= require('body-parser')
const fileUpload= require('express-fileupload')
const app = express()
const path = require('path')

const errorMiddleware= require('./middleware/error')

//setting up config file
if(process.env.NODE_ENV !== 'production')require('dotenv').dotenv.config({path: 'backend/config/config.env'})



app.use(express.json({limit: '50mb'}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit:50000}));
app.use(cookieParser());
app.use(fileUpload())
// app.use(express.json())
// app.use(bodyparser.urlencoded({extended:true}))
// app.use(cookieParser())
// app.use(fileUpload())


//import all routes
const products= require('./routes/productRoutes')
const users= require('./routes/userRoutes')
const orders= require('./routes/orderRoutes')

app.use('/api/v1', products)
app.use('/api/v1', users)
app.use('/api/v1', orders)

if(process.env.NODE_ENV==='PRODUCTION'){
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*', (req,res)=>{
        res.sendFile(path.resolve(__dirname,'../frontend/build/index.html'))
    })
}

//middleware to handle errors
app.use(errorMiddleware)

module.exports=app 
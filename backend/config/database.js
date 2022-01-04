const mongoose= require('mongoose')

const dotenv = require('dotenv')

dotenv.config({path: __dirname + '/config.env'})

const connectDatabase= ()=>{
    mongoose.connect(process.env.DB_LOCAL_URI,{
       
    }).then(con=>{
        console.log(`MongoDB Database connected with HOST: ${con.connection.host}`)
    })
} 

module.exports= connectDatabase
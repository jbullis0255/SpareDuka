const app = require('./app')
const connectDatabase = require('./config/database')


const cloudinary = require('cloudinary')



//handle uncaught exceptions
process.on('uncaughtException',err=>{
    console.log(`ERROR: ${err.stack}`)
    console.log('shutting down due to uncaught Exception')
    process.exit(1)
})

// const dotenv = require('dotenv')

//setting up config file
if(process.env.NODE_ENV !== 'production')require('dotenv').dotenv.config({path: 'backend/config/config.env'})



//connecting to databse
connectDatabase() 

//setting up cloudinary configuration
cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET
})
 


 const server= app.listen(process.env.PORT,()=>{
  console.log(`Server started on port: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)}
  )

  //hande unhandled promise rejections
  process.on('unhandledRejection',err=>{
      console.log(`ERROR: ${err.stack}`)
      console.log('shutting down server due to unhandled promise rejection')
      server.close(()=>{
          process.exit(1)
      })
  })


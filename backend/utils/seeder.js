const dotenv= require('dotenv')
const products= require('../data/product.json')
const Product= require('../models/product')
const connectDatabase= require('../config/database')

//configure dotenv
dotenv.config({path: 'backend/config/config.env'})

connectDatabase()

const seedProducts= async()=>{
    try {
        await Product.deleteMany()
        console.log('Products are deleted')

        await Product.insertMany(products)
        console.log('Products are inserted')

        process.exit()
    } 
    catch (error) {
        console.log(error.message)
        process.exit()
    }
}
seedProducts()
const mongoose = require("mongoose")
require("dotenv").config()

const mongoUri = process.env.MONGODB

const initializeDatabase = () =>{
    mongoose
    .connect(mongoUri)
    .then(()=>{
        console.log("Connected to database successfully")
    })
    .catch(()=>{
        console.log("An error occured while connecting to database",error)
    })
}

const readBookByTitle = async (bookTitle) =>{
    try {
        const book = await Book.findOne({title:bookTitle})
    return book
    } catch (error) {
        console.log("An error occured",error)
    }
}

module.exports={initializeDatabase}
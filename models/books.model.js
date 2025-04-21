const mongoose = require("mongoose")

const BookSchema = new mongoose.Schema({
    title: {type: String, required:true},
  author: {type: String, required:true},
  publishedYear: {type: Number, required:true},
  genre: [String],
  language: {type: String, required:true},
  country: {type: String, required:true},
  rating: Number,
  summary: String,
  coverImageUrl: String
})

const Book = mongoose.model("Book",BookSchema)
module.exports = Book
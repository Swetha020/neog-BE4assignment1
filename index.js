const {initializeDatabase} = require("./db/db.connect")
const Book = require("./models/books.model")
initializeDatabase()

const express = require ("express")
const app = express()

app.use(express.json())

const addNewBook = async(bookData) =>{
    try {
        const book = new Book(bookData)
        const addedBook = await book.save(book)
        return addedBook
    } catch (error) {
        console.log("An error occured",error)
    }
}
app.post("/books", async (req,res)=>{
    try {
        const newBook = await addNewBook(req.body)
        res.status(201).json({message:"Book added successfully",book:newBook})
    } catch (error) {
        res.status(500).json({error:"Failed to add Book"})
    }
})

const readAllBooks = async() =>{
    try {
        const books = await Book.find()
        return books
    } catch (error) {
        console.log("An error occured",error)
    }
}

app.get("/books",async(req,res)=>{
    try {
        const books = await readAllBooks()
       if(books.length!=0){
        res.status(200).json({books})
       }else{
        res.status(404).json({message: "No books found"})
       }
    } catch (error) {
        res.status(500).json({error:"Unable to fetch Data"})
    }
})

PORT = process.env.PORT
app.listen(PORT, () =>{
    console.log(`server is running on port ${PORT}`)
})
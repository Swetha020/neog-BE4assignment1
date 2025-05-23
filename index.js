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

const readBookByTitle = async (bookTitle) =>{
    try {
        const book = await Book.findOne({title:bookTitle})
    return book
    } catch (error) {
        console.log("An error occured",error)
    }
}

app.get("/books/:title",async(req,res)=>{
    try {
        const book = await readBookByTitle(req.params.title)
        if(book){
            res.status(200).json(book)
        }else{
            res.status(404).json({message:"Book not found"})
        }
    } catch (error) {
        res.status(500).json({error:"Unable to fetch Data"})
    }
})

const readBookByAuthor = async (authorName) =>{
    try {
        const books = await Book.find({author:authorName})
        return books
    } catch (error) {
        console.log("An error occurred",error)
    }
}

app.get("/books/author/:authorName",async(req,res)=>{
    try {
        const books = await readBookByAuthor(req.params.authorName)
        if(books.length != 0){
            res.status(200).json(books)
        }else{
            res.status(404).json({message:"Books not found"}) 
        }
    } catch (error) {
        res.status(500).json({error:"Failed to fetch data"})
    }
})

const readBookByGenre = async (genre) =>{
    try {
        const books = await Book.find({genre:genre})
        return books
    } catch (error) {
        console.log("An error occurred",error)
    }
}

app.get("/books/genre/:genreName",async(req,res)=>{
    try {
        const books = await readBookByGenre(req.params.genreName)
        if(books.length != 0){
            res.status(200).json(books)
        }else{
            res.status(404).json({message:"Books not found"}) 
        }
    } catch (error) {
        res.status(500).json({error:"Failed to fetch data"})
    }
})

const readBooksByYear = async (year) =>{
    try {
        const books = await Book.find({publishedYear:year})
        return books
    } catch (error) {
        console.log("An error occurred",error)
    }
}

app.get("/books/release/:year",async(req,res)=>{
    try {
        const books = await readBooksByYear(req.params.year)
        if(books.length != 0){
            res.status(200).json(books)
        }else{
            res.status(404).json({message:"Books not found"}) 
        }
    } catch (error) {
        res.status(500).json({error:"Failed to fetch data"})
    }
})

const updateBookById = async(bookId,updateData) =>{
    try {
        const updatedBook = await Book.findByIdAndUpdate(bookId,updateData,{new:true})
        return updatedBook
    } catch (error) {
        console.log("An error occured",error)
    }
}

app.post("/books/:bookId",async (req,res)=>{
    try {
        const updatedBook = await updateBookById(req.params.bookId,req.body)
        if(updatedBook){
            res.status(200).json({message: "Book successfully updated",book:updatedBook})
        }else{
            res.status(404).json({error:"Book not found"}) 
        }
    } catch (error) {
        res.status(500).json({error:"Failed to update data"})
    }
})


const updateBookByTitle = async(bookTitle,updateData) =>{
    try {
        const updatedBook = await Book.findOneAndUpdate({title:bookTitle},updateData,{new:true})
        return updatedBook
    } catch (error) {
        console.log("An error occured",error)
    }
}

app.post("/books/update/:bookTitle",async (req,res)=>{
    try {
        const updatedBook = await updateBookByTitle(req.params.bookTitle,req.body)
        if(updatedBook){
            res.status(200).json({message: "Book successfully updated",book:updatedBook})
        }else{
            res.status(404).json({error:"Book does not exist"}) 
        }
    } catch (error) {
        res.status(500).json({error:"Failed to update data"})
    }
})

const deleteBookById = async(bookId) =>{
    try {
        const deletedBook = await Book.findByIdAndDelete(bookId)
        return deletedBook
    } catch (error) {
        console.log("An error occured",error)
    }
}

app.delete("/books/:bookId",async(req,res)=>{
    try {
        const deletedBook = await deleteBookById(req.params.bookId)
        if(deletedBook){
            res.status(200).json({message: "Book successfully deleted"})
        }else{
            res.status(404).json({error:"Book does not exist"}) 
        }
    } catch (error) {
        res.status(500).json({error:"Failed to delete data"})
    }
})

PORT = process.env.PORT
app.listen(PORT, () =>{
    console.log(`server is running on port ${PORT}`)
})
const { BookModel } = require("../models/book.model");

const createBook = async (data) => {
    const {title, author , genre , price } = data;
    try {
        if(!title || !author || !genre || !price){
            throw new Error("All Fields are required")
        }
        const book = await BookModel.create({title, author, genre ,price});
        if(!book){
            throw new Error('Not able to create book! try again later');
        }
        return book
    } catch (error) {
        throw error;
    }
}

const deleteBook = async (id) => {
    try {
        const deletedBook = await BookModel.findByIdAndDelete(id);
        if(!deletedBook){
            throw new Error("Book not found");
        }
        return deletedBook;
    } catch (error) {
        throw error;
    }
}

const updateBook = async (data) => {

    const {id, title, author, genre , price} = data;
    let update = {};
    if (title) update.title = title;
    if (author) update.author = author;
    if (genre) update.genre = genre;
    if (price) update.price = price;
    try {
        const updatedBook = await BookModel.findByIdAndUpdate(id, update, {new: true});
        if(!updatedBook){
            throw new Error("Book not found");
        }
        return updatedBook;
    } catch (error) {
        throw error;
    }
}

const getSingleBook = async (id)=>{
    try {
        const singlBook = await BookModel.findById(id);
        if(!singlBook){
            throw new Error("Not able to find book! try again later")
        }

        return singlBook;
    } catch (error) {
        throw error
    }
}

const getAllBooks = async () => {
    try {
        const AllBooks = await BookModel.find();
        if(!AllBooks){
            throw new Error("Not able to find books! try again later")
        }

        return AllBooks;
    } catch (error) {
        throw error
    }
}

module.exports = {createBook, updateBook, deleteBook, getAllBooks, getSingleBook}
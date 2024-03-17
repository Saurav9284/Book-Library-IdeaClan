const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    "title" : {
        type : String,
        required: true,
        trim: true
    },
    "author" : {
        type : String,
        required : true,
        trim : true,
    },
    "genre" : {
        type : String,
        required : false,
        trim : true
    },
    "price" : {
        type : Number,
        required : false,
        trim : true
    }
})

const BookModel = mongoose.model("Book", bookSchema)

module.exports = {BookModel}
const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a book title'],
        trim: true,
        maxlength: [150, 'Title cannot be more than 150 characters']
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
        maxlength: [1000, 'Description cannot be more than 1000 characters']
    },
    publisher: {
        type: String,
        required: [true, 'Please add a publisher'],
        trim: true
    },
    course: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }],
    isbn: {
        type: String,
        required: [true, 'Please add an ISBN'],
        unique: true,
        trim: true
    },
    stock: {
        type: Number,
        default: 0,
        min: [0, 'Stock cannot be negative']
    },
    publishedDate: {
        type: Number
    },
    coverImage: {
        type: String,
        default: 'no-cover.jpg'
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Book', bookSchema)
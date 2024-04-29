// seedBooks.js
const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker'); // Corrected import for faker
// const Book = require('./src/models/book.schema'); // Adjust the path according to your project structure

mongoose.connect('', { // Replace with your connection string
    autoIndex: true,
});

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    genre: String,
    publishedYear: Number,
    isbn: String,
    quantityInStock: Number,
    isDeleted: { type: Boolean, default: false }
}, { timestamps: true , versionKey: false });

const Book = mongoose.model('Book', bookSchema);

async function seedBooks() {
    for (let i = 0; i < 15; i++) {
        const title = faker.commerce.productName();
        const author = faker.person.firstName() + ' ' + faker.person.lastName();
        const genre = faker.music.genre();
        // RANDAOM DATE BETWEEN 1900 AND 2021
        const publishedYear = faker.date.between('1900-01-01', '2021-12-31').getFullYear();
        // RANDOM 13 DIGIT ISBN ALPHANUMERIC WITH CAPITAL LETTERS WITH OUT FAKER
        const isbn = Math.random().toString(36).substring(2, 15).toUpperCase();
        // RANDOM NUMBER BETWEEN 0 AND 50
        const quantityInStock = Math.floor(Math.random() * 51);

        const book = new Book({
            title,
            author,
            genre,
            publishedYear,
            isbn,
            quantityInStock
        });

        console.log(book);

        await book.save();
    }

    console.log('15 books have been added to the database!');
}

seedBooks().then(() => {
    mongoose.connection.close();
});

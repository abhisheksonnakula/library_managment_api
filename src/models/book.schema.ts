import { model, Schema, Document } from 'mongoose';

// Interface to type the document
export interface IBook extends Document {
    title: string;
    author: string;
    genre: string;
    publishedYear: number;
    isbn: string;
    quantityInStock: number;
}

// Schema definition for the Book
const bookSchema: Schema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    genre: {
        type: String,
        required: true,
        trim: true
    },
    publishedYear: {
        type: Number,
        required: true
    },
    isbn: {
        type: String,
        required: true,
        unique: true,  // ISBN should be unique
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    quantityInStock: {
        type: Number,
        required: true,
        min: 0  // Stock cannot be negative
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,  // Adds createdAt and updatedAt
    versionKey: false  // Disable __v field
});

// Create and export the model
const Book = model<IBook>('Book', bookSchema);
export default Book;

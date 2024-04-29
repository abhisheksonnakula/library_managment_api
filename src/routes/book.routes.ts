import express from 'express';
import { BooksController } from '../controllers/book.controller';
import { BookService } from '../services/book.service';
import { BookRepository } from '../repositories/book.repository';
import Book from '../models/book.schema';
import { validateBook, validateBookId, validatePagination, validateUpdatedBook } from '../validations/book.validation';
import { authenticate } from '../middlewares/authenticate';

const router = express.Router();
const bookService = new BookService(new BookRepository(Book));
const booksController = new BooksController(bookService);

// Post a new book
router.post('/',authenticate(['Librarian']),validateBook, booksController.createBook);

// Get all books
router.get('/',validatePagination, booksController.getBooks);

// Retrieve a list of books with the quantity in stock less than 5.
router.get('/low-in-stock/',authenticate(['Librarian']), booksController.getBooksLowInStock);

// Get book by id
router.get('/:id', validateBookId, booksController.getBookById);

// Update book by id
router.put('/:id',authenticate(['Librarian']), validateBookId,validateUpdatedBook, booksController.updateBookById);

// Delete book by id
router.delete('/:id',authenticate(['Librarian']), validateBookId, booksController.deleteBookById);



export default router;

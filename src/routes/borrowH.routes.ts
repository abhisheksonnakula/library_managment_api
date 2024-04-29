import express from 'express';
import { BorrowHService } from '../services/borrowH.service';
import { BorrowHRepository } from '../repositories/borrowH.repository';
import { BookRepository } from '../repositories/book.repository';
import { UserRepository } from '../repositories/user.repository';
import BorrowH from '../models/borrowH.schema';
import User from '../models/user.schema';
import Book from '../models/book.schema';
import { BorrowHController } from '../controllers/borrowH.controller';
import { authenticate } from '../middlewares/authenticate';
import { validateBorrowH } from '../validations/borrowH.validation';
import { validatePagination } from '../validations/book.validation';


const router = express.Router();
const borrowHService = new BorrowHService(new BorrowHRepository(BorrowH),new BookRepository(Book),new UserRepository(User));
const borrowHController = new BorrowHController(borrowHService);


// Post a new borrowH
router.post('/', validateBorrowH , authenticate(['Librarian']) , borrowHController.createBorrowH);

// Return a book
router.put('/:id/return', authenticate(['Librarian']), borrowHController.returnBook);

// Get all borrowHs
router.get('/', validatePagination , authenticate(['Librarian']), borrowHController.getBorrowHs);

// Retrieve a list of users who have borrowed books more than twice.
router.get('/users-who-borrowed-more-than-twice', authenticate(['Librarian']), borrowHController.getUsersWhoBorrowedMoreThanTwice)

// Calculate the total number of books borrowed by each user.
router.get('/total-books-borrowed-by-each-user', authenticate(['Librarian']), borrowHController.getTotalNumberOfBooksBorrowedByEachUser)

// Get borrowH by id
router.get('/:id', authenticate(['Librarian']), borrowHController.getBorrowHById);




export default router;

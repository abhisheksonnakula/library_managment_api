import { NextFunction, Request, Response } from 'express';
import { BookService } from '../services/book.service';

export class BooksController {
    constructor(private bookService: BookService) {
    }

    // Create a new book
    public createBook = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const book = await this.bookService.createBook(req.body);
            res.status(201).json(book);
        } catch (error: any) {
            next(error); // Pass the error to the error handler middleware
        }
    }

    // Get books with pagination
    public getBooks = async (req: Request, res: Response , next: NextFunction ) => {
        try {
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 10;
            const books = await this.bookService.getBooks(page, limit);
            res.status(200).json(books);
        } catch (error: any) {
            console.log(error);
            next(error); // Pass the error to the error handler middleware
        }
    };

    // Get book by id
    public getBookById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const book = await this.bookService.getBookById(req.params.id);
            res.status(200).json(book);
        } catch (error: any) {
            next(error); // Pass the error to the error handler middleware
        }
    }

    public updateBookById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const book = await this.bookService.updateBookById(req.params.id, req.body);
            res.status(200).json(book);
        } catch (error: any) {
            next(error); // Pass the error to the error handler middleware
        }
    };

    public deleteBookById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const book = await this.bookService.deleteBookById(req.params.id);
            res.status(200).json(book);
        } catch (error: any) {
            next(error); // Pass the error to the error handler middleware
        }
    };

    // Retrieve a list of books with the quantity in stock less than 5.
    public getBooksLowInStock = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const books = await this.bookService.getBooksLowInStock();
            res.status(200).json(books);
        } catch (error: any) {
            next(error); // Pass the error to the error handler middleware
        }
    };

}

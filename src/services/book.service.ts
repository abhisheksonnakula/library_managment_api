import { BookRepository } from '../repositories/book.repository';
import { IBook } from '../models/book.schema';

export class BookService {
    constructor(private bookRepository: BookRepository) {}

    // Create New Book
    async createBook(bookData: any): Promise<IBook> {
        return this.bookRepository.create(bookData);
    };

    // Get books with pagination
    async getBooks(
        page: number,
        limit: number,
    ) {
        // SORT BY TITTLE AND GET BOOKS
        const books = await this.bookRepository.find({ isDeleted: false }, { page, limit, sort: { title: 1 } });
        return {
            data : books.documents,
            page : books.page,
            limit : books.limit,
            total : books.total
        }
    };

    // Get book by id
    async getBookById(id: string): Promise<IBook | null> {
        const book = await this.bookRepository.findById(id);
        if(!book){
            throw new Error('Book not found');
        };
        return this.bookRepository.findById(id);
    };

    // Update book by id
    async updateBookById(id: string,bookData: any): Promise<IBook | null> {
        const book = await this.bookRepository.findOneAndUpdate({
            _id: id
        }, bookData, { new: true });
        if(!book){
            throw new Error('Book not found');
        };
        return book;
    };

    // Delete book by id
    async deleteBookById(id: string) : Promise<{ message: string }>{

        const book = this.bookRepository.findOneAndUpdate({
            _id: id
        },{isDeleted: true}, { new: true });

        if(!book){
            throw new Error('Book not found');
        };
        return {
            message: 'Book Deleted Successfully',
        }
    };

    // Retrieve a list of books with the quantity in stock less than 5.
    async getBooksLowInStock() {
        const count = await this.bookRepository.count({ isDeleted: false, quantityInStock: { $lt: 5 } });
        const books = await this.bookRepository.find({ isDeleted: false, quantityInStock: { $lt: 5 } }, { limit: count , page: 1});
        return {
            data: books.documents,
            total: books.total
        }
    };
}

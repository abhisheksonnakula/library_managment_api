import { BookRepository } from "../repositories/book.repository";
import { BorrowHRepository } from "../repositories/borrowH.repository";
import { UserRepository } from "../repositories/user.repository";

export class BorrowHService {

    constructor(
        private borrowHRepository: BorrowHRepository,
        private bookResository: BookRepository,
        private userResository: UserRepository,
    ) { }

    // Create New BorrowH
    async createBorrowH(borrowHData: any) {

        const user = await this.userResository.findOne({ _id: borrowHData.userId });

        if (!user) {
            throw new Error('User not found');
        };
        const book = await this.bookResository.findOne({ _id: borrowHData.bookId });

        if (!book) {
            throw new Error('Book not found');
        };

        if (book.quantityInStock < 1) {
            throw new Error('Book not available');
        };

        const borrowH = await this.borrowHRepository.findOne({ userId: borrowHData.userId, bookId: borrowHData.bookId, status: 'Borrowed' });

        if (borrowH) {
            throw new Error('Book already borrowed');
        };

        await this.borrowHRepository.create(borrowHData);

        await this.bookResository.findOneAndUpdate({ _id: borrowHData.bookId }, { quantityInStock: book.quantityInStock - 1 });

        return {
            message : 'Borrow History created successfully'
        };
    };

    // Return Book
    async returnBook(borrowHId: string) {

        const borrowH = await this.borrowHRepository.findOne({ _id: borrowHId, status: 'Borrowed' });

        if (!borrowH) {
            throw new Error('Borrow History not found');
        };

        await this.borrowHRepository.findOneAndUpdate({ _id: borrowHId }, { status: 'Returned' , returnDate: new Date()});

        const book = await this.bookResository.findOne({ _id: borrowH.bookId });

        if (book) {
            await this.bookResository.findOneAndUpdate({ _id: borrowH.bookId }, { quantityInStock: book.quantityInStock + 1 });
        };

        return {
            message : 'Book returned successfully'
        };
    };

    // Get Borrow History with pagination
    async getBorrowHistory(page: number, limit: number) {
        const borrowHistory = await this.borrowHRepository.find({ }, { page, limit, sort: { createdAt: -1 } });
        return {
            data: borrowHistory.documents,
            page: borrowHistory.page,
            limit: borrowHistory.limit,
            total: borrowHistory.total
        };
    };

    // Get Borrow History by id
    async getBorrowHistoryById(id: string) {
        const borrowHistory = await this.borrowHRepository.findById(id);
        if (!borrowHistory) {
            throw new Error('Borrow History not found');
        };
        return borrowHistory;
    };

    // Retrieve a list of users who have borrowed books more than twice.
    async getUsersWhoBorrowedMoreThanTwice() {
        const users = await this.borrowHRepository.aggregate([
            {
                $group: {
                    _id: "$userId",
                    total: { $sum: 1 }
                }
            },
            {
                $match: {
                    total: { $gt: 2 }
                }
            }
        ]);
        return users;
    };

    // Calculate the total number of books borrowed by each user.
    async getTotalBooksBorrowedByUser() {
        const users = await this.borrowHRepository.aggregate([
            {
                $group: {
                    _id: "$userId",
                    total: { $sum: 1 }
                }
            }
        ]);
        return users;
    };

}
import { BorrowHService } from "../services/borrowH.service";
import { NextFunction , Request, Response } from "express";

export class BorrowHController {
    constructor(private borrowHService: BorrowHService) {
    }

    public createBorrowH = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const borrowH = await this.borrowHService.createBorrowH(req.body);
            res.status(201).json(borrowH);
        } catch (error: any) {
            next(error);
        }
    };

    public returnBook = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const borrowH = await this.borrowHService.returnBook(req.params.id);
            res.status(200).json(borrowH);
        } catch (error: any) {
            next(error);
        }
    };

    public getBorrowHs = async (req: Request, res: Response, next: NextFunction) => {

        try {
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 10;
            const borrowHs = await this.borrowHService.getBorrowHistory(page, limit);
            res.status(200).json(borrowHs);
        } catch (error: any) {
            next(error);
        }
    };

    public getBorrowHById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const borrowH = await this.borrowHService.getBorrowHistoryById(req.params.id);
            res.status(200).json(borrowH);
        } catch (error: any) {
            next(error);
        }
    };

    // Retrieve a list of users who have borrowed books more than twice.
    public getUsersWhoBorrowedMoreThanTwice = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const users = await this.borrowHService.getUsersWhoBorrowedMoreThanTwice();
            res.status(200).json(users);
        } catch (error: any) {
            next(error);
        }
    };

    // Calculate the total number of books borrowed by each user.
    public getTotalNumberOfBooksBorrowedByEachUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const users = await this.borrowHService.getTotalBooksBorrowedByUser();
            res.status(200).json(users);
        } catch (error: any) {
            next(error);
        }
    };

}
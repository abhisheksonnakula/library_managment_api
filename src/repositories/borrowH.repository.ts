import { Model } from 'mongoose';
import { IBorrowH } from '../models/borrowH.schema';
import { AbstractRepository } from './abstract.repository';

export class BorrowHRepository extends AbstractRepository<IBorrowH> {
    constructor(model: Model<IBorrowH>) {
        super(model);
    };
}
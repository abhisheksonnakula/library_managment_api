import { IBook } from '../models/book.schema';
import { Model } from 'mongoose';
import { AbstractRepository } from './abstract.repository';

export class BookRepository extends AbstractRepository<IBook> {

    constructor(model: Model<IBook>) {
        super(model);
    };
}

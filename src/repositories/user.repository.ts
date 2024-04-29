import { IUser } from '../models/user.schema';
import { AbstractRepository } from './abstract.repository';
import { Model } from 'mongoose';

export class UserRepository extends AbstractRepository<IUser> {

    constructor(model: Model<IUser>) {
        super(model);
    };
}
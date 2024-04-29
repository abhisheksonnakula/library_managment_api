import { Schema, model , Document } from 'mongoose';

export interface IBorrowH extends Document{
    userId: string;
    bookId: string;
    borrowedDate: Date;
    returnDate?: Date;
    status: 'Borrowed' | 'Returned';
};

const BorrowHSchema = new Schema({
    userId: { 
        type: String, 
        required: true
    },
    bookId: { type: String, required: true},
    borrowedDate: { type: Date, default: Date.now },
    returnDate: { type: Date },
    status: { type: String, enum: ['Borrowed', 'Returned'], default: 'Borrowed' }
});

const BorrowH = model<IBorrowH>('BorrowH', BorrowHSchema);
export default BorrowH;
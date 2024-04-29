// Validate Borrow History

import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const borrowHScehma = Joi.object({
    bookId: Joi.string().required(),
    userId: Joi.string().required()
});

export const validateBorrowH = (req: Request, res: Response, next: NextFunction) => {
    const { error } = borrowHScehma.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};
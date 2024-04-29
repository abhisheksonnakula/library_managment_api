import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

// Define the schema
const bookSchema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    genre: Joi.string().required(),
    publishedYear: Joi.number().integer().required(),
    isbn: Joi.string().required(),
    quantityInStock: Joi.number().integer().min(0).required()
});

// Middleware for Add Book validation
export const validateBook = (req: Request, res: Response, next: NextFunction) => {
    const { error } = bookSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

// Middleware for Updated book validation
const updateBookSchema = Joi.object({
    title: Joi.string(),
    author: Joi.string(),
    genre: Joi.string(),
    publishedYear: Joi.number().integer(),
    isbn: Joi.string(),
    quantityInStock: Joi.number().integer().min(0)
});

export const validateUpdatedBook = (req: Request, res: Response, next: NextFunction) => {
    const { error } = updateBookSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
}

// Middleware for pagination
const paginationSchema = Joi.object({
    page: Joi.number().integer().min(1),
    limit: Joi.number().integer().min(1)
});


export const validatePagination = (req: Request, res: Response, next: NextFunction) => {
    const { error } = paginationSchema.validate(req.query);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

// Middleware for book id validation

const bookIdSchema = Joi.object({
    id: Joi.string().required()
});

export const validateBookId = (req: Request, res: Response, next: NextFunction) => {
    const { error } = bookIdSchema.validate({ id: req.params.id });
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};


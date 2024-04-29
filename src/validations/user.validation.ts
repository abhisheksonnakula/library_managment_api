import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

// Define the schema
const userSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    // Password must contain at least one letter, at least one number, and be longer than six charaters
    password: Joi.string().pattern(new RegExp('^(?=.*[a-zA-Z])(?=.*[0-9]).{6,}$')).required().messages({
        'string.pattern.base': 'Password must contain at least one letter, at least one number, and be longer than six charaters'
    }),
    role: Joi.string().valid('Member', 'Librarian').required()
});

// Middleware for Create User validation
export const validateUser = (req: Request, res: Response, next: NextFunction) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

// Middleware for Update User validation
const updateUserSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string(),
    role: Joi.string().valid('Member', 'Librarian')
});

export const validateUpdatedUser = (req: Request, res: Response, next: NextFunction) => {
    const { error } = updateUserSchema.validate(req.body);
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

// Middleware for Login validation
const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
    const { error } = loginSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};




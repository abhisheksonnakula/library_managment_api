import { Request, Response, NextFunction , ErrorRequestHandler } from 'express';
import mongoose from 'mongoose';

interface ErrorWithStatus extends Error {
    status?: number;  // Optional status code property
}

// Centralized error handling middleware
export const errorHandler : ErrorRequestHandler = (err: ErrorWithStatus, req: Request, res: Response, next: NextFunction) => {
    let statusCode = err.status || 500; // Default to 500 if no status code is present
    let message = err.message || 'An unexpected error occurred';

    console.error(err);  // Log the error

    // Handle specific mongoose and MongoDB errors
    if (err instanceof mongoose.Error.ValidationError) {
        statusCode = 400;
        message = err.message;
    } else if (err instanceof mongoose.Error.CastError) {
        statusCode = 400;
        message = "Invalid data format.";
    } else if (err.name === 'MongoNetworkError') {
        statusCode = 503;
        message = "Unable to connect to the database.";
    }

    console.error(err);  // Log the detailed error

    res.status(statusCode);
    res.json({
        message: err.message || 'An unexpected error occurred',
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
};

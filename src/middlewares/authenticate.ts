import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
    id: string;
    email: string;
    role: 'Member' | 'Librarian';
}

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// Extend the middleware to accept roles
export const authenticate = (roles: Array<'Member' | 'Librarian'> = []) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const token = req.header('Authorization')?.split(' ')[1]; // Bearer TOKEN_HERE

        if (!token) {
            // return res.status(401).json({ message: 'No token provided, authorization denied' });
            return next({ message: 'No token provided, authorization denied', status: 401 })
        }

        try {
            const decoded = jwt.verify(token, JWT_SECRET) as UserPayload;
            // Check if the user has one of the required roles
            if (roles.length && !roles.includes(decoded.role)) {
                // return res.status(403).json({ message: 'Access denied: insufficient privileges' });
                return next({ message: 'Access denied: insufficient privileges', status: 403 });
            }
            req.user = decoded;
            next();
        } catch (err) {
            // res.status(401).json({ message: 'Token is not valid' });
            next({ message: 'Token is not valid', status: 401 });
        }
    };
};

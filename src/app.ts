import express, { Application, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import config from './config';

// Route imports
import bookRoutes from './routes/book.routes';
import userRoutes from './routes/user.routes';
import borrowHistoryRoutes from './routes/borrowH.routes';

// Middleware imports
import { errorHandler } from './middlewares/errorHandler';

// Load environment variables
dotenv.config();

// Create Express app
const app: Application = express();

// Middlewares
app.use(cors());                // Enables CORS
app.use(express.json());        // Parses incoming JSON requests and puts the parsed data in req.body

// Database connection
const mongoUri: string = config.mongoUri || 'mongodb://localhost:27017/library';
mongoose.connect(mongoUri, {
    autoIndex: true,
}).then(() => console.log('MongoDB connected successfully.'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/books', bookRoutes);
app.use('/users', userRoutes);
app.use('/borrow-history', borrowHistoryRoutes);

// Health Check Endpoint
app.get('/', (req: Request, res: Response) => {
    res.status(200).send('Server is Running!');
});

// Undefined routes handler (404)
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).send("Sorry can't find that!");
});

// Centralized error handling
app.use(errorHandler);

// Export the app for use in server.ts
export default app;

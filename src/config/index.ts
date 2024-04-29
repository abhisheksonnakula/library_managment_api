import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

interface Config {
    port: number;
    mongoUri: string;
    jwtSecret: string;
    environment: string;
}

// Define the configuration with fallback defaults
const config: Config = {
    port: parseInt(process.env.PORT || '3000'),
    mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/library',
    jwtSecret: process.env.JWT_SECRET || 'your_secret_key',
    environment: process.env.NODE_ENV || 'development'
};

export default config;

import app from './app'; // Import the configured Express application
import http from 'http';
import config from './config';

// Define the port on which the server will run
const PORT = config.port || 4000;

// Create HTTP server
const server = http.createServer(app);

// Listen on provided port, on all network interfaces
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log('Press CTRL-C to stop\n');
});

// Handle unhandled promise rejections (e.g., MongoDB connection issues)
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Application specific logging, throwing an error, or other logic here
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1); // Mandatory (as per the Node.js docs)
});


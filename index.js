const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const config = require('./config');

const PORT = config.port || 4000;
const app = express();
dotenv.config();



// Middlewares
app.use(cors());                // Enables CORS
app.use(express.json());        // Parses incoming JSON requests and puts the parsed data in req.body

// Database connection
const mongoUri = config.mongoUri;
mongoose.connect(mongoUri, {
    autoIndex: true,
}).then(() => console.log('MongoDB connected successfully.'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.get('/', (req, res) => {
    res.send('Hello World! test route');
});



// Listen on provided port, on all network interfaces
app.listen(PORT, () => {
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
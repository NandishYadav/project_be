const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const config = require('./config');


// Routes
const usersRoutes = require('./routes/usersRoutes');
const propertiesRoutes = require('./routes/properitieRoutes');
const interestedPropertiesRoutes = require('./routes/interestedproRoutes');

const PORT = config.port || 4000;
const app = express();
dotenv.config();



// Middlewares
const corsOptions = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    'strict-origin-when-cross-origin': 'false',
    'content-type': 'application/json',

    'Access-Control-Allow-Origin': '*', // Required for CORS support to work
    "optionsSuccessStatus": 204
  };
app.use(cors(corsOptions));              // Enables CORS
app.use(express.json());        // Parses incoming JSON requests and puts the parsed data in req.body

// Database connection
const mongoUri = config.mongoUri;
mongoose.connect(mongoUri, {
    autoIndex: true,
}).then(() => console.log('MongoDB connected successfully.'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes

// Health check endpoint
app.get('/', (req, res) => {
    res.json({
      status: 'success',
      message: 'Welcome to the PropertyPro Lite API',
    });
});

//Auth routes
app.use('/api/v1/auth', usersRoutes);

//Properties routes
app.use('/api/v1/properties', propertiesRoutes);

//Interested properties routes
app.use('/api/v1/interest', interestedPropertiesRoutes);



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
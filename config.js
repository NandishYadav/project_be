const dotenv = require('dotenv');

// Load environment variables from the .env file
dotenv.config();


// Define the configuration with fallback defaults
const config = {
    port: parseInt(process.env.PORT || '4000'),
    mongoUri: process.env.MONGODB_URI || 'mongodb+srv://nanduyadavrny:lZtRzqLpTkdDQRMO@cluster0.mhq2v9n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    jwtSecret: process.env.JWT_SECRET || 'your_secret_key',
    environment: process.env.NODE_ENV || 'development'
};

module.exports =  config;
const { configDotenv } = require('dotenv');
const cors = require('cors');
const express = require('express');
const app = require('./src/app'); // Import the Express app
const connectToDatabase = require('./src/Utils/connectToDB');

configDotenv(); // Load environment variables

// Define allowed origins
const allowedOrigins = ['https://growsphere.onrender.com', 'http://localhost:5173'];

// Configure CORS to allow only specified origins
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));

app.use(express.json()); 

const PORT = process.env.PORT || 3001;

connectToDatabase(); // Connect to the database

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

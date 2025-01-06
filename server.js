const { configDotenv } = require('dotenv');
const cors = require('cors');
const express = require('express');
const app = require('./src/app'); // Import the Express app
const connectToDatabase = require('./src/Utils/connectToDB');

configDotenv(); // Load environment variables
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse incoming JSON request bodies

const PORT = process.env.PORT || 3001;

connectToDatabase(); // Connect to the database

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

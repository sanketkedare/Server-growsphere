const { configDotenv } = require('dotenv');
const mongoose = require('mongoose');
configDotenv();

const DB_URL = process.env.DB_URL

const connectToDatabase = async() =>
{
    try 
    {
        await mongoose.connect(DB_URL);
        console.log("Connected to the database")
    } 
    
    catch (error) {
        console.log("Error connecting to the database");
    }

}

module.exports = connectToDatabase;
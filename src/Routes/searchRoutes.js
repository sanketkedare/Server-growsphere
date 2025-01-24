const express = require('express');
const cors = require('cors');
const { suggestionByName, suggestionByEmail, suggectionByLocation, suggestionById } = require('../Controller/searchController');
const searchRouter = express.Router();
searchRouter.use(express.json());

const allowedOrigins = ['https://growsphere.onrender.com', 'http://localhost:5173'];


searchRouter.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));

searchRouter.post('/',suggestionByName);
searchRouter.post('/email', suggestionByEmail);
searchRouter.post('/location', suggectionByLocation)
searchRouter.get('/:id', suggestionById)

module.exports = searchRouter;
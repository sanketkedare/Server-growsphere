const express = require("express");
const { registerController} = require("../Controller/authController");
const {profileController, updateUserController} = require("../Controller/profileController");
const cors = require('cors');

const userRouter = express.Router();
userRouter.use(express.json());
// Define allowed origins
const allowedOrigins = ['https://growsphere.onrender.com', 'http://localhost:5173'];

// Configure CORS to allow only specified origins
userRouter.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));

// Register a new user (Company, Invester, or Employee)
userRouter.post("/register", registerController);
userRouter.post('/profile/:id', profileController );
userRouter.put('/profile/:id', updateUserController)


module.exports = userRouter;

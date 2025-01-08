const express = require("express");
const { registerController} = require("../Controller/authController");
const {profileController, updateUserController} = require("../Controller/profileController");
const cors = require('cors');

const userRouter = express.Router();
userRouter.use(express.json());
userRouter.use(cors())

// Register a new user (Company, Invester, or Employee)
userRouter.post("/register", registerController);
userRouter.post('/profile/:id', profileController );
userRouter.put('/profile/:id', updateUserController)


module.exports = userRouter;

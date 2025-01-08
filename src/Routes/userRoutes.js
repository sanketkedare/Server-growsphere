const express = require("express");
const { registerController} = require("../Controller/authController");
const profileController = require("../Controller/profileController");

const userRouter = express.Router();
userRouter.use(express.json());

// Register a new user (Company, Invester, or Employee)
userRouter.post("/register", registerController);
userRouter.post('/profile', profileController )


module.exports = userRouter;

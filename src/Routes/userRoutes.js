const express = require("express");
const { registerController, loginController, profileController } = require("../Controller/authController");
const { verifyToken } = require("../Middleware/authMiddleware");

const userRouter = express.Router();
userRouter.use(express.json());

// Register a new user (Company, Invester, or Employee)
userRouter.post("/register", registerController);

// Login route
userRouter.post("/login", loginController);

// Protected route example (requires JWT verification)
userRouter.get("/profile", verifyToken, profileController);

module.exports = userRouter;

const express = require("express");
const cors = require('cors');
const { getSingleCompanyController, getAllCompanyController } = require("../Controller/companyController");

const companyRouter = express.Router();

companyRouter.use(express.json());

const allowedOrigins = ['https://growsphere.onrender.com', 'http://localhost:5173'];


companyRouter.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));

companyRouter.get("/", getAllCompanyController);
companyRouter.get("/:id", getSingleCompanyController);

module.exports = companyRouter;

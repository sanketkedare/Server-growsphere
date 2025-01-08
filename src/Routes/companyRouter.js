const express = require("express");
const cors = require('cors');
const { getSingleCompanyController, getAllCompanyController } = require("../Controller/companyController");

const companyRouter = express.Router();

companyRouter.use(express.json());
companyRouter.use(cors());

companyRouter.get("/", getAllCompanyController);
companyRouter.get("/:id", getSingleCompanyController);

module.exports = companyRouter;

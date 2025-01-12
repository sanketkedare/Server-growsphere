const express = require("express");
const investmentsRouter = express.Router();
const {
  getAllInvestments,
  getInvestmentsByCompany,
  getInvestmentsByInvester,
  createInvestment,
  updateInvestment,
} = require("../Controller/investmentController");

investmentsRouter.use(express.json())

// Route to get all investments
investmentsRouter.get("/", getAllInvestments);

// Route to get investments by companyId
investmentsRouter.get("/company/:companyId", getInvestmentsByCompany);

// Route to get investments by investerId
investmentsRouter.get("/invester/:investerId", getInvestmentsByInvester);

// Route to create a new investment
investmentsRouter.post("/", createInvestment);

// Route to update an investment by ID
investmentsRouter.put("/:id", updateInvestment);

module.exports = investmentsRouter;

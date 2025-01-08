const express = require("express");
const Company = require("../Model/company");

const companyRouter = express.Router();
companyRouter.use(express.json());

companyRouter.get("/", async (req, res) => {
  try {
    const companyData = await Company.find();

    if (companyData) {
      res.status(200).json(companyData);
    } else {
      res.status(404).json({ message: "No Data Found!" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while getting company data", error: error });
  }
});

companyRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const companyData = await Company.findById(id);
    if (companyData) {
      res.status(200).json(companyData);
    } else {
      res.status(404).json({ message: "Data Not Found" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = companyRouter;

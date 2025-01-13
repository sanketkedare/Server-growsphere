const Investments = require("../Model/investments");

const getAllInvestments = async (req, res) => {
  try {
    const investments = await Investments.find();
    res.status(200).json(investments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch investments", error });
  }
};

const getInvestmentsByCompany = async (req, res) => {
  try {
    const { companyId } = req.params;
    console.log(companyId);

    const investments = await Investments.find({
      "investmentNumber.companyId": companyId,
    });
    if (investments.length === 0) {
      return res
        .status(404)
        .json({ message: "No investments found for this company" });
    }
    res.status(200).json(investments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch investments", error });
  }
};

const getInvestmentsByInvester = async (req, res) => {
  try {
    const { investorId } = req.params;
    const investments = await Investments.find({
      "investmentNumber.investorId": investorId,
    });
    if (investments.length === 0) {
      return res
        .status(404)
        .json({ message: "No investments found for this investor" });
    }
    res.status(200).json(investments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch investments", error });
  }
};

const createInvestment = async (req, res) => {
  try {
    const data = req.body;

    // Validate the presence of investmentNumber and its nested fields
    if (!data.investmentNumber) {
      return res.status(400).json({
        message: "investmentNumber with investerId and companyId is required",
      });
    }

    // Create a new investment document
    const newInvestment = await Investments.create(data);
    res.status(201).json({
      message: "Investment created successfully",
      investment: newInvestment,
    });
  } catch (error) {
    // Handle unique constraint error (duplicate investerId and companyId)
    if (error.code === 11000) {
      return res.status(400).json({ message: "Your investment with this company is already in progress" });
    }

    // Handle other errors
    res.status(500).json({ message: "Failed to create investment", error: error.message });
  }
};


const updateInvestment = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Validate if the investment exists
    const existingInvestment = await Investments.findById(id);
    if (!existingInvestment) {
      return res.status(404).json({ message: "Investment not found" });
    }

    // Update the investment
    const updatedInvestment = await Investments.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true } // Return the updated document and validate schema
    );

    res.status(200).json({
      message: "Investment updated successfully",
      investment: updatedInvestment,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update investment", error });
  }
};

module.exports = {
  getAllInvestments,
  getInvestmentsByCompany,
  getInvestmentsByInvester,
  createInvestment,
  updateInvestment,
};

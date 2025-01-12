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
    const investments = await Investments.find({ companyId });
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
    const { investerId } = req.params;
    const investments = await Investments.find({ investerId });
    if (investments.length === 0) {
      return res
        .status(404)
        .json({ message: "No investments found for this invester" });
    }
    res.status(200).json(investments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch investments", error });
  }
};

const createInvestment = async (req, res) => {
    
  try {
    const data = req.body;
    // Validate required fields
    if (!data.investerId || !data.companyId) {
      return res
        .status(400)
        .json({ message: "Invester ID and Company ID are required" });
    }

    // Create a new investment document
    const newInvestment = new Investments(data);

    // Save to the database
    const savedInvestment = await newInvestment.save();
    res
      .status(201)
      .json({
        message: "Investment created successfully",
        investment: savedInvestment,
      });
  } catch (error) {
    res.status(500).json({ message: "Failed to create investment", error });
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

    res
      .status(200)
      .json({
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

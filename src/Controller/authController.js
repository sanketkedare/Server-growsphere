const { COMPANY, INVESTER } = require("../Utils/constants");
const Employee = require("../Model/employee");
const Company = require("../Model/company");
const Invester = require("../Model/invester");

const registerController = async (req, res) => {
  const { userType, data } = req.body;

  try {
    if (!userType || !data || !data.email) {
      return res
        .status(400)
        .json({ message: "userType and email are required." });
    }

    const { email, ...rest } = data;

    let existingUser =
      (await Invester.findOne({ email })) ||
      (await Company.findOne({ email })) ||
      (await Employee.findOne({ email }));

    if (existingUser) {
      return res.status(409).json({
        message: "Email already exists. Please log in.",
        existingUser,
      });
    }

    let response;
    if (userType === COMPANY) {
      response = await Company.create({
        userType,
        email,
        password: email,
        ...rest,
      });
    } else if (userType === INVESTER) {
      response = await Invester.create({
        userType,
        email,
        ...rest,
      });
    } else {
      response = await Employee.create({
        userType,
        email,
        ...rest,
      });
    }

    res.status(201).json({
      message: `Registered successfully as ${userType}.${
        userType === "EMP" ? "Profile is under review." : ""
      }`,
      user: { response },
    });
  } catch (error) {
    console.error(error); // Log the full error for debugging
    res.status(500).json({
      message: `Error registering as ${userType}`,
      error: error.message,
    });
  }
};

const registerAll = async (req, res) => {
  try {
    const companies = req.body;

    const savedCompanies = [];
    for (let companyData of companies) {
      const company = new Company(companyData);
      await company.save(); // This triggers the pre-save hook
      savedCompanies.push(company);
    }

    res
      .status(201)
      .json({ message: "Created successfully", response: savedCompanies });
  } catch (error) {
    console.error(error); // Log the full error for debugging
    res
      .status(500)
      .json({ message: "Error while registering companies", error });
  }
};

module.exports = { registerController, registerAll };

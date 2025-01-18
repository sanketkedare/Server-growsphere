const { COMPANY, INVESTER } = require("../Utils/constants");
const Employee = require("../Model/employee");
const Company = require("../Model/company");
const Invester = require("../Model/invester");

// Register Controller
const registerController = async (req, res) => {
  const { userType, data } = req.body;

  try {
    const { email, ...rest } = data;

    // Check if email already exists
    let existingUser =
      (await Invester.findOne({ email })) ||
      (await Company.findOne({ email })) ||
      (await Employee.findOne({ email }));

    if (existingUser) {
      return res
        .status(409)
        .json({
          message: "Email already exists. Please log in.",
          existingUser,
        });
    }

    // Create user based on userType
    let response;
    if (userType === COMPANY) {
      response = await Company.create({ userType, email, ...rest });
    } else if (userType === INVESTER) {
      response = await Invester.create({ userType, email, ...rest });
    } else {
      response = await Employee.create({ userType, email, ...rest });
    }

    res.status(201).json({
      message: `Registered successfully as ${userType}.${
        userType === "EMP" ? "Profile is under review." : ""
      }`,
      user: { response },
    });
  } catch (error) {
    res
      .status(500)
      .json({
        message: `Error registering as ${userType}`,
        error: error.message,
      });
  }
};

module.exports = { registerController };

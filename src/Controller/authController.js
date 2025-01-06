const jwt = require("jsonwebtoken");
const { COMPANY, INVESTER } = require("../Utils/constants");
const Employee = require("../Model/employee");
const Company = require("../Model/company");
const Invester = require("../Model/invester");

const SECRET_KEY = process.env.SECRET_KEY || "your_secret_key";

// Register Controller
const registerController = async (req, res) => {
  const { userType, data } = req.body;
  console.log("Register Request Body:", req.body);

  try {
    const { email, ...rest } = data;

    // Check if email already exists
    let existingUser =
      (await Invester.findOne({ email })) ||
      (await Company.findOne({ email })) ||
      (await Employee.findOne({ email }));

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists. Please log in." });
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

    // Generate JWT
    const token = jwt.sign(
      {
        id: response._id,
        role: response.userType,
      },
      SECRET_KEY,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      message: `Registered successfully as ${userType}. ${
        userType === "EMP" ? "Profile is under review." : ""
      }`,
      token, // Include the token in the response
      user: {response},
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: `Error registering as ${userType}`, error: error.message });
  }
};

// Login Controller
const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists in any role
    let user =
      (await Invester.findOne({ email })) ||
      (await Company.findOne({ email })) ||
      (await Employee.findOne({ email }));

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Validate password
    const isPasswordValid = await user.comparePassword(password); // Assuming comparePassword is defined in your schema
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        id: user._id,
        role: user.userType,
      },
      SECRET_KEY,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user._id, email: user.email, userType: user.userType },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Error during login", error: error.message });
  }
};

// Example Protected Route Controller
const profileController = async (req, res) => {
  try {
    res.status(200).json({
      message: "Accessed profile data",
      user: req.user, // Decoded user info from JWT
    });
  } catch (error) {
    console.error("Error accessing profile:", error);
    res.status(500).json({ message: "Error accessing profile", error: error.message });
  }
};

module.exports = { registerController, loginController, profileController };

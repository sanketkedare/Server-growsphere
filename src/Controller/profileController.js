const Employee = require("../Model/employee");
const Company = require("../Model/company");
const Invester = require("../Model/invester");
const { INVESTER, COMPANY, EMPLOYEE } = require("../Utils/constants");

const profileController = async (req, res) => {
  const { email } = req.body;
  try {
    const userData =
      (await Invester.findOne({ email })) ||
      (await Company.findOne({ email })) ||
      (await Employee.findOne({ email }));

    if (!userData) throw new Error("User not found");
    res.status(200).json(userData);
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};


const updateUserController = async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  // Validate if 'userType' exist
  if (!body.userType && !body.email) {
    return res
      .status(400)
      .json({ message: "Invalid input: 'email' and 'userType' are required" });
  }
  try {
    let userData;

    // Find and update user based on 'userType'
    if (body.userType === INVESTER) {
      userData = await Invester.findByIdAndUpdate({ _id: id }, body, {
        new: true,
      });
    } else if (body.userType === COMPANY) {
      userData = await Company.findByIdAndUpdate({ _id: id }, body, {
        new: true,
      });
    } else if (body.userType === EMPLOYEE) {
      userData = await Employee.findByIdAndUpdate({ _id: id }, body, {
        new: true,
      });
    } else {
      return res.status(400).json({ message: "Invalid 'userType'" });
    }

    // Check if user was not found and not updated
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    // Respond with success
    res
      .status(200)
      .json({ message: "User updated successfully", data: userData });
  } catch (error) {
    console.error("Error updating user:", error);
    res
      .status(500)
      .json({ message: "Error updating user", error: error.message });
  }
};

module.exports = { profileController, updateUserController };

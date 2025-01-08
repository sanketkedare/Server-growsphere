const Employee = require("../Model/employee");
const Company = require("../Model/company");
const Invester = require("../Model/invester");

const profileController = async (req, res) => {
  const { email } = req.body;
  try {
    const user =
      (await Invester.findOne({ email })) ||
      (await Company.findOne({ email })) ||
      (await Employee.findOne({ email }));
    
    if (!user) throw new Error("User not found");

    res.status(200).send(user);
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

module.exports = profileController;

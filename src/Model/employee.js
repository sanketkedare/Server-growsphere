const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

// Design schema for all employees (CEO to all) in the business app
const EmployeeSchema = new Schema(
  {
    userType: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true, // Password should be mandatory for security
    },
    imageUrl: {
      type: String,
      default: "NOT SET", // Default value if no image is provided
    },
    location: {
      type: String,
      default: "NOT SET",
    },
    granted: {
      type: Boolean,
      default: false,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensure unique email for each employee
      trim: true, // Remove unnecessary spaces
      lowercase: true, // Convert email to lowercase
    },
    name: {
      type: String, // Employee's name
      default: "NOT SET",
    },
    position: {
      type: String,
      required: true, // Position is required (e.g., CEO, Manager)
    },
    permissions: {
      type: Map,
      of: Boolean, // Use a Map to store permissions (key-value pairs)
      default: new Map([
        ["removeCompany", false],
        ["blockInvestor", false],
        ["removeEmployee", false], // Only for CEO
        ["other", false],
      ]),
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

// Pre-save hook to hash the password before saving
EmployeeSchema.pre("save", async function (next) {
  const employee = this;

  // Only hash the password if it has been modified or is new
  if (!employee.isModified("password")) return next();

  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(10);

    // Hash the password using the salt
    employee.password = await bcrypt.hash(employee.password, salt);

    next();
  } catch (err) {
    next(err);
  }
});

// Method to compare passwords during login
EmployeeSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Create and export the Employee model
const Employee = model("Employee", EmployeeSchema);

module.exports = Employee;

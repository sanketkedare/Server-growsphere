const { Schema, model } = require("mongoose");

// Design schema for all employees (CEO to all) in the business app
const EmployeeSchema = new Schema(
  {
    userType: {
      type: String,
      required: true,
    },
    password: {
      String,
    },

    granted: {
      type: Boolean,
      default: false,
    },
    email: {
      required: true,
      type: String,
      unique: true, // Ensure unique email for each employee
      trim: true, // Remove unnecessary spaces
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
      of: Boolean, // Use a map to store permissions, where each key is a permission type
      default: {
        removeCompany: false, // Permission to remove a company
        blockInvestor: false, // Permission to block an investor
        removeEmployee: false, // Permission to remove employees (only for CEO)
        other: false, // Placeholder for other potential permissions
      },
    },
  },
  { timestamps: true }
);

// Pre-save hook to hash the password before saving

const Employee = model("Employee", EmployeeSchema);

module.exports = Employee;

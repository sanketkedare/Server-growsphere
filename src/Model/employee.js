const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

// Design schema for all employees (CEO to all) in the business app
const EmployeeSchema = new Schema({
    userType: {
        type: String,
        required: true,
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
    password: {
        type: String,
        required: true, // Password is required for authentication
    },

    name: {
        type: String, // Employee's name
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
}, { timestamps: true });

// Pre-save hook to hash the password before saving
EmployeeSchema.pre('save', async function(next) {
    if (this.isModified('password') || this.isNew) {
        try {
            const salt = await bcrypt.genSalt(10); // Generate salt with 10 rounds
            this.password = await bcrypt.hash(this.password, salt); // Hash the password
            next(); // Proceed with saving the document
        } catch (error) {
            next(error); // If error occurs, pass it to the next middleware
        }
    } else {
        next(); // If password is not modified, skip the hook
    }
});

const Employee = model('Employee', EmployeeSchema);

module.exports = Employee;

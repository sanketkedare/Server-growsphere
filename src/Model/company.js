const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

// Define the Company schema
const CompanySchema = new Schema({
    userType: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensure unique emails
        trim: true, // Remove unnecessary spaces
        lowercase: true, // Save emails in lowercase
    },
    password: {
        type: String, // Define the type for the password
        required:true
    },
    name: {
        type: String,
        required: true,
        unique: true, // Ensure no duplicate company names
        trim: true,
    },
    image: {
        type: String,
        default: "NOT SET",
    },
    turnover: {
        type: String,
        default: "NOT SET",
    },
    shareholding: {
        type: String,
        default: "NOT SET",
    },
    funds_requirement: {
        type: String,
        default: "NOT SET",
    },
    started_year: {
        type: Number,
        default: null, // Default is null to align with Number type
    },
    type_of_company: {
        type: String,
        default: "NOT SET",
    },
    location: {
        type: String,
        default: "NOT SET",
        trim: true,
    },
    contact: {
        type: String,
        default: "NOT SET",
        trim: true,
    },
    ceo: {
        type: String,
        default: "NOT SET",
        trim: true,
    },
    website: {
        type: String,
        default: "NOT SET",
        trim: true,
        lowercase: true,
    },
    extra_information: {
        type: String,
        default: "NOT SET",
    },
}, { timestamps: true }); // Add timestamps for createdAt and updatedAt

// Pre-save hook for password encryption
CompanySchema.pre("save", async function (next) {
    const user = this;
  
    // Only hash the password if it has been modified or is new
    if (!user.isModified("password")) return next();
  
    try {
        // Generate a salt
        const salt = await bcrypt.genSalt(10);
  
        // Hash the password using the salt
        user.password = await bcrypt.hash(user.password, salt);
  
        next();
    } catch (err) {
        next(err);
    }
});
  
// Method to compare passwords during login
CompanySchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Create and export the Company model
const Company = mongoose.model('Company', CompanySchema);

module.exports = Company;

const mongoose = require('mongoose');
const { Schema } = mongoose;

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
    password:{
        String
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

const Company = mongoose.model('Company', CompanySchema);

module.exports = Company;

const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');


// Define the Company schema
const CompanySchema = new Schema({
    userType: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true, // Password is required
    },
    password: {
        type: String,
        required: true, // Password is required
    },
    name: {
        type: String,
        required: true, // Company name is required
        unique: true, // Ensure no duplicate company names
        trim: true, // Remove unnecessary spaces
    },
    image: {
        type: String, // URL for the company's profile image or logo
    },
    turnover: {
        type: String, // Company's turnover (e.g., "10M USD")
    },
    shareholding: {
        type: String, // Shareholding percentage (e.g., "70%")
    },
    funds_requirement: {
        type: String, // Funds required (e.g., "2M USD")
    },
    started_year: {
        type: Number, // Year the company was started (e.g., 2015)
    },
    type_of_company: {
        type: String, // Type of company (e.g., "Technology")
    },
    location: {
        type: String, // Location of the company (e.g., "San Francisco, USA")
    },
    contact: {
        type: String, // Contact number (e.g., "+1 123-456-7890")
    },
    ceo: {
        type: String, // CEO's name (e.g., "John Doe")
    },
    website: {
        type: String, // Company's website URL (e.g., "https://www.techinnovations.com")
        trim: true, // Remove unnecessary spaces
        lowercase: true, // Save the URL in lowercase
    },
    extra_information: {
        type: String, // Additional details about the company
    },
});

CompanySchema.pre('save', async function(next) {
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

const Company = mongoose.model('Company', CompanySchema);

module.exports = Company;

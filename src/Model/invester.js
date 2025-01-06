const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');


// Define the Invester schema
const InvesterSchema = new Schema({
    userType: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensure no duplicate emails
        trim: true, // Remove unnecessary spaces
        lowercase: true, // Save emails in lowercase
    },
    password: {
        type: String,
        required: true, // Password is required
    },
    name: {
        type: String, // Optional field for investor's name
    },
    imageUrl: {
        type: String, // URL for the investor's profile picture
    },
    role: {
        type: String, // Role of the investor (e.g., Angel Investor, Venture Capitalist)
    },
    investmentFocus: {
        type: String, // Area of investment focus (e.g., Technology, FinTech)
    },
    portfolioHighlights: {
        type: [String], // Array of strings for portfolio achievements
    },
    contactDetails: {
        email: {
            type: String, // Contact email (separate from login email)
        },
        phone: {
            type: String, // Phone number
        },
        location: {
            type: String, // Investor's location
        },
    },
    aboutMe: {
        type: String, // Investor's bio or description
    },
});

InvesterSchema.pre('save', async function(next) {
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

const Invester = mongoose.model('Invester', InvesterSchema);

module.exports = Invester;

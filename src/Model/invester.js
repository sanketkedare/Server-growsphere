const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define the Invester schema
const InvesterSchema = new Schema({
  userType: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure no duplicate emails
    trim: true, // Remove unnecessary spaces
    lowercase: true, // Save emails in lowercase
  },

  name: {
    type: String, // Optional field for investor's name
    default: "NOT SET",
  },
  imageUrl: {
    type: String, // URL for the investor's profile picture
    default: "NOT SET",
  },
  role: {
    type: String, // Role of the investor (e.g., Angel Investor, Venture Capitalist)
    default: "NOT SET",
  },
  investmentFocus: {
    type: String, // Area of investment focus (e.g., Technology, FinTech)
    default: "NOT SET",
  },
  portfolioHighlights: {
    type: [String], // Array of strings for portfolio achievements
    default:[],
  },
  contactDetails: {
    phone: {
      type: String, // Phone number
      default: "NOT SET",
    },
    location: {
      type: String, // Investor's location
      default: "NOT SET",
    },
  },
  aboutMe: {
    type: String, // Investor's bio or description
    default: "NOT SET",
  },
});

const Invester = mongoose.model("Invester", InvesterSchema);

module.exports = Invester;

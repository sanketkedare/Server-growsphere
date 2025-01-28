const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

// Define the Invester schema
const InvesterSchema = new Schema(
  {
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
    password: {
      type: String,
      required: true, // Password should be mandatory
    },
    name: {
      type: String, // Optional field for investor's name
      default: "NOT SET",
    },
    connections: {
      type: {
        requests: {type: [String], default: [] },
        pendings: { type: [String], default: [] },
        accepted: { type: [String], default: [] },
        blocked: { type: [String], default: [] },
      },
    },
    posts:{
      type: [String],
      default: []
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
      default: [],
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
  },
  { timestamps: true } // Add createdAt and updatedAt fields
);

// Pre-save hook to hash the password
InvesterSchema.pre("save", async function (next) {
  const invester = this;

  // Only hash the password if it has been modified or is new
  if (!invester.isModified("password")) return next();

  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(10);

    // Hash the password using the salt
    invester.password = await bcrypt.hash(invester.password, salt);

    next();
  } catch (err) {
    next(err);
  }
});

// Method to compare passwords during login
InvesterSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Create the model
const Invester = mongoose.model("Invester", InvesterSchema);

module.exports = Invester;

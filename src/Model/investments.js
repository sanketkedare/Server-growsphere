const { Schema, model } = require("mongoose");

const InvestmentSchema = new Schema(
    {
      investerId: {
        type: Schema.Types.ObjectId,
        required: true,
      },
      companyId: {
        type: Schema.Types.ObjectId,
        required: true,
      },
      massages: {
        type: [String],
        default: null,
      },
      meeting: {
        type: {
          link:{
            type: String,
            default : null
          },
          timeSlots:{
            type: Object,
            default: {}
          },
        },
        default: null,
      },
      progress: {
        type: String,
        enum: ["Pending", "Approved", "Rejected", "In Progress", "Completed"],
        default: "Pending",
      },
      payments: {
        type: [
          {
            amount: {
              type: Number,
              required: false, // Make amount optional
            },
            date: {
              type: Date,
              required: false, // Make date optional
            },
            method: {
              type: String,
              enum: ["Bank Transfer", "Credit Card", "Cash", "Other"],
              default: "Bank Transfer",
            },
            status: {
              type: String,
              enum: ["Pending", "Completed", "Failed"],
              default: "Pending",
            },
          },
        ],
        default: [], // Default to an empty array
      },
    },
    { timestamps: true }
  );
  
  const Investments = model('Investments', InvestmentSchema);

  module.exports = Investments
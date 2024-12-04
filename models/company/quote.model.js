const mongoose = require("mongoose");

// Product schema
const quoteSchema = new mongoose.Schema(
  {
    quote_Client: {
      name: { type: String },
      email: { type: String },
      phone: { type: String },
    },
    quote_Products: [
      {
        product: {
          type: String,
        },
        quantity: {
          type: Number,
        },
      },
    ],
    quote_Total_Price: {
      type: Number,
    },
    quote_Details: {
      dateCreated: { type: Date, default: Date.now },
      status: {
        type: String,
        enum: ["Pending", "Accepted", "Rejected"],
        default: "Pending",
      },
    },
  },
  { timestamps: true }
);

const Quote = mongoose.model("Quote", quoteSchema);
module.exports = Quote;

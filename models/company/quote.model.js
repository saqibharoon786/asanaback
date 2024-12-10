const mongoose = require("mongoose");

// Product schema
const quoteSchema = new mongoose.Schema(
  {
    quote_Creater: {
      name: { type: String },
      email: { type: String },
      phone: { type: String }
    },
    quote_Client: {
      name: { type: String },
      email: { type: String },
      contact: { type: String },
      address: { type: String }
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
    quote_TotalPrice: {
      type: Number,
    },
    quote_Discount: {
      type: Number
    },
    quote_DiscountedPrice: {
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

const mongoose = require("mongoose");

// Product schema
const quoteSchema = new mongoose.Schema(
  {
    companyId: { type: String },
    quote_Identifier: {
      type: String,
    },
    quote_Creater: {
      name: { type: String },
      email: { type: String },
      contact: { type: String },
    },
    quote_Client: {
      client_Name: { type: String },
      client_Email: { type: String },
      client_Contact: { type: String },
      client_Address: { type: String },
    },
    quote_Products: [
      {
        product: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 0,
        },
        product_BeforeTaxPrice: {
          type: Number,
          default: 0,
        },
        product_Tax: {
          type: Number,
          default: 0,
        },
        product_AfterTaxPrice: {
          type: Number,
          default: 0,
        },
        product_Tax: {
          type: Number,
          default: 0,
        },
        product_DiscountPercentage: {
          type: Number,
          default: 0,
        },
        product_Discount: {
          type: Number,
          default: 0,
        },
        product_AfterDiscountPrice: {
          type: Number,
          default: 0,
        },
      },
    ],
    quote_InitialPayment: {
      type: Number,
    },
    quote_BeforeTaxPrice: {
      type: Number,
    },
    quote_AfterTaxPrice: {
      type: Number,
    },
    quote_AfterDiscountPrice: {
      type: Number,
    },
    quote_Details: {
      dateCreated: { type: Date, default: Date.now },
      status: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending",
      },
    },
    deleted: { type: Boolean, default: false },
  },

  { timestamps: true }
);

const Quote = mongoose.model("Quote", quoteSchema);
module.exports = Quote;

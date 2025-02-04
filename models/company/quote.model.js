const mongoose = require("mongoose");

// Product schema
const quoteSchema = new mongoose.Schema(
  {
    companyId: { type: String },
    quote_Identifier: {
      type: String,
    },
    quote_Creater: {
      type: String, 
    },
    quote_SalesPerson: {
      type: String,
    },
    quote_Customer: {
      type: String,
    },
    quote_Products: [
      {
        product: {
          type: String,
        },
        product_SellingPrice: {
          type: Number,
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
    quote_Image: { filePath: { type: String } },
    quote_InitialPayment: {
      type: Number,
    },
    quote_BeforeTaxPrice: {
      type: Number,
    },
    quote_TotalTax: {
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
    quote_Subject: {
      type: String,
    },
    quote_Project: {
      type: String,
    },
    quote_LeadId: {
      type: String,
    },
    quote_SalesPerson: {
      type: String,
    },
    quote_Date: {
      type: String,
    },
    quote_ExpiryDate: {
      type: String,
    },
    quote_ReferenceNumber: {
      type: String,
    },
    deleted: { type: Boolean, default: false },
  },

  { timestamps: true }
);

const Quote = mongoose.model("Quote", quoteSchema);
module.exports = Quote;

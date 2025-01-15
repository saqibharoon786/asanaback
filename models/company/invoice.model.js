const mongoose = require("mongoose");

// Product schema
const invoiceSchema = new mongoose.Schema(
  {
    companyId: { type: String },
    invoice_Identifier: {
      type: String,
    },
    invoice_Creater: {
      name: { type: String },
      email: { type: String },
      contact: { type: String },
    },
    invoice_Client: {
      client_Name: { type: String },
      client_Email: { type: String },
      client_Contact: { type: String },
      client_Address: { type: String },
    },
    invoice_Products: [
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
    invoice_InitialPayment: {
      type: Number,
    },
    invoice_BeforeTaxPrice: {
      type: Number,
    },
    invoice_AfterTaxPrice: {
      type: Number,
    },
    invoice_AfterDiscountPrice: {
      type: Number,
    },
    invoice_Details: {
      dateCreated: { type: Date, default: Date.now },
      status: {
        type: String,
        enum: ["Paid", "Unpaid"],
        default: "Unpaid",
      },
    },
    deleted: { type: Boolean, default: false },
  },

  { timestamps: true }
);

const Invoice = mongoose.model("Invoice", invoiceSchema);
module.exports = Invoice;
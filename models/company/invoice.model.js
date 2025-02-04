const mongoose = require("mongoose");

// Invoice schema
const invoiceSchema = new mongoose.Schema(
  {
    companyId: { type: String },
    invoice_Identifier: {
      type: String,
    },
    invoice_Creater: {
      type: String,
    },
    invoice_SalesPerson: {
      type: String,
    },
    invoice_Customer: {
      type: String,
    },
    invoice_Products: [
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
    invoice_Image: { filePath: { type: String } },
    invoice_InitialPayment: {
      type: Number,
    },
    invoice_BeforeTaxPrice: {
      type: Number,
    },
    invoice_TotalTax: {
      type: Number,
    },
    invoice_AfterDiscountPrice: {
      type: Number,
    },
    invoice_Details: {
      dateCreated: { type: Date, default: Date.now },
      status: {
        type: String,
        enum: ["Unpaid", "Paid"],
        default: "Unpaid",
      },
    },
    invoice_Subject: {
      type: String,
    },
    invoice_Project: {
      type: String,
    },
    invoice_LeadId: {
      type: String,
    },
    invoice_Date: {
      type: Date,
      default: Date.now,
    },
    invoice_DueDate: {
      type: Date,
    },
    invoice_ReferenceNumber: {
      type: String,
    },
    deleted: { type: Boolean, default: false },
  },

  { timestamps: true }
);

const Invoice = mongoose.model("Invoice", invoiceSchema);
module.exports = Invoice;

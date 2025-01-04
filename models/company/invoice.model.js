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
      contact: { type: String }
    },
   invoice_Client: {
      client_Name: { type: String },
      client_Email: { type: String },
      client_Contact: { type: String },
      client_Address: { type: String }
    },
   invoice_Products: [
      {
        product: {
          type: String,
        },
        quantity: {
          type: Number,
        },
        product_Price: {
          type: Number,
        },  
        product_Tax: {
          type: Number,
        },
        
        product_Discount: {
          type: Number,
        },  
        product_FinalAmount: {
          type: Number,
        },      
      },
    ],
   invoice_TotalPrice: {
      type: Number,
    },
   invoice_Details: {
      dateCreated: { type: Date, default: Date.now },
      status: {
        type: String,
        enum: [ "Paid","Unpaid"],
        default: "Unpaid",
      },
    },
    deleted: { type: Boolean, default: false }
   

  },
  
  { timestamps: true }
);

const Invoice = mongoose.model("Invoice", invoiceSchema);
module.exports = Invoice;

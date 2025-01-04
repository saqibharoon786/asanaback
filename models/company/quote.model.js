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
      contact: { type: String }
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
    quote_TotalPrice: {
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
    deleted: { type: Boolean, default: false }
  },
  
  { timestamps: true }
);

const Quote = mongoose.model("Quote", quoteSchema);
module.exports = Quote;

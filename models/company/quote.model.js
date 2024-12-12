const mongoose = require("mongoose");

// Product schema
const quoteSchema = new mongoose.Schema(
  {
    quote_Identifier: {
      type: String,
    },
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
        enum: ["Pending", "Accepted", "Rejected"],
        default: "Pending",
      },
    },
    deleted: { type: Boolean, default: false }
  },
  
  { timestamps: true }
);

const Quote = mongoose.model("Quote", quoteSchema);
module.exports = Quote;

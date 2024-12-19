const mongoose = require("mongoose");

// Product schema
const productSchema = new mongoose.Schema(
  {
    product_Name: {
      type: String,
    },
    product_CostPrice: {
      type: Number,
    },

    product_SellingPrice: {
      type: Number,
    },
    
    product_StockQuantity: {
      type: Number,
    },
    product_Category: {
      type: String,
      default: "",
    },
    product_Description: {
      type: String,
      default: "",
    },
    product_DateOfPurchase: {
      type: Date,
    },
    product_DamagedPieces: {
      type: Number,
    },
    product_StockLocation: {
      type: String,
    },
    product_Image: {
      filePath: { type: String },
    },
  
    deleted: { type: Boolean, default: false },
    product_Vendor: {
      vendor_Name: { type: String },
      vendor_Email: { type: String },
      vendor_Address: { type: String },
      vendor_Contact: { type: Number },
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;

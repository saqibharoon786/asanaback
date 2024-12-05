const mongoose = require("mongoose");

// Product schema
const productSchema = new mongoose.Schema(
  {
    product_Name: {
      type: String,
    },
    product_Price: {
      type: Number,
    },
    product_Description: {
      type: String,
      default: "",
    },
    product_StockQuantity: {
      type: Number,
    },
    product_Category: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;

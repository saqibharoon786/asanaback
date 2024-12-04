const mongoose = require("mongoose");

// Product schema
const productSchema = new mongoose.Schema(
  {
    product_Name: {
      type: String,
      required: true,
    },
    product_Price: {
      type: Number,
      required: true,
    },
    product_Description: {
      type: String,
      default: "",
    },
    product_StockQuantity: {
      type: Number,
      required: true,
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

const express = require("express");
const companyModel = require("../models/company/companyIndex.model");

const addProduct = async (req, res) => {
  try {
    const {
      product_Name,
      product_Price,
      product_Description,
      product_StockQuantity,
      product_Category,
    } = req.body;

    if (
      !product_Name ||
      !product_Price ||
      !product_Description ||
      !product_StockQuantity ||
      !product_Category
    ) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "All fields required",
      });
    }

    // Check if the product already exists in the Product collection
    const existingProduct = await companyModel.Product.findOne({
      product_Name,
    });
    if (existingProduct) {
      return res.status(409).json({
        success: false,
        status: 409,
        message: "Product already exists",
      });
    }

    // Create a new product
    const newProduct = await companyModel.Product.create({
      product_Name,
      product_Price,
      product_Description,
      product_StockQuantity,
      product_Category,
    });

    // Save the product to the database
    await newProduct.save();
    return res.status(201).json({
      success: true,
      status: 201,
      message: "Product created successfully",
      information: {
        createdProduct: {
          newProduct,
        },
      },
    });
  } catch (error) {
    console.log("error:", error);
    return res
      .status(500)
      .json({ success: false, status: 500, message: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const allProducts = await companyModel.Product.find();

    return res.status(200).json({
      success: true,
      status: 200,
      message: "All products fetched successfully",
      information: {
        allProducts,
      },
    });
  } catch (error) {
    console.log("error:", error);
    return res
      .status(500)
      .json({ success: false, status: 500, message: error.message });
  }
};

const project = {
  addProduct,
  getAllProducts,
};

module.exports = project;

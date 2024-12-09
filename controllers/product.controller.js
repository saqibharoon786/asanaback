const express = require("express");
const companyModel = require("../models/company/companyIndex.model");
const addProduct = async (req, res) => {
  try {
    const {
      product_Name,
      product_Price,
      product_StockQuantity,
      product_Category,
      product_Description,
      product_DateOfPurchase,
      product_DamagedPieces,
      product_StockLocation,
      product_Vendor,
    } = req.body;

    if (
      !product_Name ||
      !product_Price ||
      !product_Description ||
      !product_StockQuantity ||
      !product_Category ||
      !product_DateOfPurchase ||
      !product_StockLocation ||
      !product_Vendor ||
      !product_Vendor.vendor_Name ||
      !product_Vendor.vendor_Email ||
      !product_Vendor.vendor_Address ||
      !product_Vendor.vendor_Contact
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
      product_DateOfPurchase,
      product_DamagedPieces: product_DamagedPieces || 0, // Default to 0 if not provided
      product_StockLocation,
      product_Vendor: {
        vendor_Name: product_Vendor.vendor_Name,
        vendor_Email: product_Vendor.vendor_Email,
        vendor_Address: product_Vendor.vendor_Address,
        vendor_Contact: product_Vendor.vendor_Contact,
      },
    });

    // Save the product to the database
    await newProduct.save();
    return res.status(201).json({
      success: true,
      status: 201,
      message: "Product created successfully",
      information: {
        newProduct,
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
    const Products = await companyModel.Product.find(); 


    if (!Products || Products.length === 0) {
      return res.status(200).json({
        success: true,
        status: 200,             
        message: "No products found",
        information: {
          products: []           
        }
      });
    }

    // If products are found, return them
    return res.status(200).json({
      success: true,
      status: 200,
      message: "All products fetched successfully",
      information: {
        products: Products       
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

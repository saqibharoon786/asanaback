const express = require("express");
const companyModel = require("../../models/company/companyIndex.model");



const getAllProducts = async (req, res) => {
  try {
    const Products = await companyModel.Product.find({ deleted: false }); 

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


const getProductInformation = async (req, res) => {
  try {
    // Destructure and validate the ID parameter
    const { productId } = req.params;
    if (!productId) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Product ID is required",
      });
    }

    // Fetch product by ID
    const product = await companyModel.Product.findById(productId);

    if (!product) {
      return res.status(200).json({
        success: true,
        status: 404,
        message: "No Product found",
        information: {
          product: {},
        },
      });
    }

    // Return the product in the response
    return res.status(200).json({
      success: true,
      status: 200,
      message: "Product retrieved successfully",
      information: {
        product, 
      },
    });
  } catch (error) {
    console.error("Error fetching Product", error);
    return res.status(500).json({
      success: false,
      status: 500,
      message: error.message,
    });
  }
};
project = {
  
  getAllProducts,
  getProductInformation,
};

module.exports = project;

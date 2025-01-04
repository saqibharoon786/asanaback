const express = require("express");
const companyModel = require("../../models/company/companyIndex.model");



const getAllProducts = async (req, res) => {
  try {
    const companyId = req.user.companyId;
    const Products = await companyModel.Product.find({ companyId, deleted: false });

    if (!Products || Products.length === 0) {
      return res.status(200).json({
        success: true,
        status: 200,
        message: "No products found",
        information: {
          products: [],
        },
      });
    }

    // If products are found, return them
    return res.status(200).json({
      success: true,
      status: 200,
      message: "All products fetched successfully",
      information: {
        products: Products,
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
    const companyId = req.user.companyId;
    const { productId } = req.params;

    if (!productId) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Product ID is required",
      });
    }

    // Fetch product by productId and companyId
    const product = await companyModel.Product.findOne({
      _id: productId,
      companyId,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "No Product found",
        information: {
          product: {},
        },
      });
    }

    // Return the full product information
    return res.status(200).json({
      success: true,
      status: 200,
      message: "Product retrieved successfully",
      information: {
        product,
      },
    });
  } catch (error) {
    console.error("Error fetching Product:", error);
    return res.status(500).json({
      success: false,
      status: 500,
      message: error.message,
    });
  }
};
product = {
  
  getAllProducts,
  getProductInformation,
};

module.exports = product;

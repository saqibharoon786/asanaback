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
    const { Id } = req.params;

    // Find product and populate vendor details
    const product = await companyModel.Product.findOne({
      Id,
      deleted: false,
    }).populate(
      "product_Vendor",
      "vendor_Name vendor_Email vendor_Contact Vendor Address"
    );

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Product information retrieved successfully",
      information: product,
    });
  } catch (error) {
    console.error("Error fetching product information:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const project = {
  
  getAllProducts,
  getProductInformation,
};

module.exports = project;

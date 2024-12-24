const express = require("express");
const companyModel = require("../../models/company/companyIndex.model");

const addProduct = async (req, res) => {
  try {
    const {
      product_Name,
      product_CostPrice,
      product_SellingPrice,
      product_StockQuantity,
      product_Category,
      product_Description,
      product_DateOfPurchase,
      product_DamagedPieces,
      product_StockLocation,
      product_Vendor,
    } = req.body;

    const product_ImagePath = `/uploads/product/${req.file.filename}`;

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
      product_CostPrice,
      product_SellingPrice,
      product_Description,
      product_StockQuantity,
      product_Category,
      product_DateOfPurchase,
      product_DamagedPieces: product_DamagedPieces || 0, // Default to 0 if not provided
      product_StockLocation,
      product_Image: {
        filePath: product_ImagePath,
      },
      deleted: false,
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
    // Fetch products where deleted is false
    const Products = await companyModel.Product.find({ deleted: false });

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

const deleteProduct = async (req, res) => {
  try {
    const { product_Name } = req.body;

    // Ensure product name is provided
    if (!product_Name) {
      return res.status(400).json({
        success: false,
        message: "Please provide the product name.",
      });
    }

    // Find the product by its name
    const product = await companyModel.Product.findOne({ product_Name });

    // If the product doesn't exist
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    // Mark the product as deleted (soft delete)
    await companyModel.Product.updateOne(
      { product_Name }, // Find the product by its name
      { $set: { deleted: true } } // Update the 'deleted' field to true
    );

    return res.status(200).json({
      success: true,
      message: "Product marked as deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const {
      product_NewName,
      product_NewCostPrice,
      product_NewSellingPrice,
      product_NewStockQuantity,
      product_NewCategory,
      product_NewDescription,
      product_NewDateOfPurchase,
      product_NewDamagedPieces,
      product_NewStockLocation,
      product_NewVendor,
    } = req.body;

    // Step 1: Find the product by its ID (should be `_id` in MongoDB)
    const product = await companyModel.Product.findById(productId); // Use findById to search by MongoDB's default `_id`

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    // Step 2: Handle image update if a new one is provided
    const newProduct_ImagePath = req.file
      ? `/uploads/product/${req.file.filename}`
      : product.product_Image.filePath;

    // Step 3: Update the product's fields with new values or retain old values if not provided
    product.product_Name = product_NewName || product.product_Name;
    product.product_CostPrice =
      product_NewCostPrice || product.product_CostPrice;
    product.product_SellingPrice =
      product_NewSellingPrice || product.product_SellingPrice;
    product.product_StockQuantity =
      product_NewStockQuantity || product.product_StockQuantity;
    product.product_Category = product_NewCategory || product.product_Category;
    product.product_Description =
      product_NewDescription || product.product_Description;
    product.product_DateOfPurchase =
      product_NewDateOfPurchase || product.product_DateOfPurchase;
    product.product_DamagedPieces =
      product_NewDamagedPieces || product.product_DamagedPieces;
    product.product_StockLocation =
      product_NewStockLocation || product.product_StockLocation;

    // Update image path
    product.product_Image.filePath = newProduct_ImagePath;

    // Update vendor information if provided
    if (product_NewVendor) {
      product.product_Vendor.vendor_Name =
        product_NewVendor.vendor_Name || product.product_Vendor.vendor_Name;
      product.product_Vendor.vendor_Email =
        product_NewVendor.vendor_Email || product.product_Vendor.vendor_Email;
      product.product_Vendor.vendor_Address =
        product_NewVendor.vendor_Address ||
        product.product_Vendor.vendor_Address;
      product.product_Vendor.vendor_Contact =
        product_NewVendor.vendor_Contact ||
        product.product_Vendor.vendor_Contact;
    }

    // Step 4: Save the updated product to the database
    await product.save();

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      information: {
        updatedProduct: product,
      },
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
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
  addProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
  getProductInformation,
};

module.exports = project;

const express = require("express");
const companyModel = require("../models/company/companyIndex.model");

const createQuote = async (req, res) => {
  try {
    // Destructure data from request body
    const { quote_Creater, quote_Client, quote_Products, quote_Details } = req.body;

    // Validation: Check if the client and products are provided
    if (!quote_Creater || !quote_Client || !quote_Products || quote_Products.length === 0) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Creator details, client details, and at least one product are required.",
      });
    }

    // Initialize total price
    let quote_Total_Price = 0;

    // Loop through each product in quote_Products array
    for (const item of quote_Products) {
      const { product, quantity } = item;

      // Find product in the database
      const dbProduct = await companyModel.Product.findOne({
        product_Name: product,
      });

      if (!dbProduct) {
        return res.status(404).json({
          success: false,
          status: 404,
          message: `Product '${product}' not found in the database.`,
        });
      }

      // Calculate the price for this product (product price * quantity)
      const productTotalPrice = dbProduct.product_Price * quantity;
      // Add this product's total price to the overall quote total
      quote_Total_Price += productTotalPrice;
    }

    // Prepare quote details
    const newQuoteDetails = {
      dateCreated: new Date(),
      status: quote_Details?.status || "Pending", // Default to "Pending" if not provided
    };

    // Create a new quote document
    const newQuote = await companyModel.Quote.create({
      quote_Creater,     
      quote_Client,         
      quote_Products,      
      quote_Total_Price,    
      quote_Details: newQuoteDetails,  
    });

    // Send response with the created quote
    return res.status(200).json({
      success: true,
      status: 200,
      message: "Quote created successfully",
      information: {
        createdQuote: newQuote, 
      },
    });
  } catch (error) {
    console.error("Error creating quote:", error);
    return res.status(500).json({
      success: false,
      status: 500,
      message: error.message,
    });
  }
};

const getAllQuotes = async (req, res) => {
  try {
    // Fetch all Quotes
    const Quotes = await companyModel.Quote.find();

    if (!Quotes || Quotes.length === 0) {
      return res.status(200).json({
        success: true,
        status: 200,
        message: "No Quotes found", 
        information: {
          Quotes: [],
        },
      });
    }

    return res.status(200).json({
      success: true,
      status: 200,
      message: "Quotes retrieved successfully",
      information: {
        Quotes,
      },
    });
  } catch (error) {
    console.error("Error fetching Quotes:", error);
    return res.status(500).json({
      success: false,
      status: 500,
      message: error.message,
    });
  }
};

const quote = {
  createQuote,
  getAllQuotes,
};

module.exports = quote;

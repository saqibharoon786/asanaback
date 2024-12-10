const express = require("express");
const companyModel = require("../models/company/companyIndex.model");

const createQuote = async (req, res) => {
  try {
    // Destructure data from request body
    const { quote_Creater, quote_Client, quote_Products, quote_Details, quote_Discount } = req.body;

    // Validation: Check if the client and products are provided
    if (!quote_Creater || !quote_Client || !quote_Products || quote_Products.length === 0) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Creator details, client details, and at least one product are required.",
      });
    }

    // Initialize total price
    var quote_TotalPrice = 0;

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
      var productTotalPrice = dbProduct.product_Price * quantity;
      // Add this product's total price to the overall quote total
      quote_TotalPrice += productTotalPrice;
    }
      var quote_DiscountedPrice = 0;
    // Apply discount if provided and valid
    if (quote_Discount && quote_Discount > 0 && quote_Discount <= 100) {
      discountAmount = (quote_TotalPrice * quote_Discount) / 100; // Calculate discount percentage
      quote_DiscountedPrice = quote_TotalPrice - discountAmount; // Subtract discount from total price
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
      quote_TotalPrice,
      quote_Discount: quote_Discount || 0, // Save the discount provided, or default to 0
      quote_DiscountedPrice,
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

const getQuoteById = async (req, res) => {
  try {
    const { quoteId } = req.params;

    // Fetch the quote by ID using findById
    const quote = await companyModel.Quote.findById(quoteId);

    // If no quote is found, return a message with an empty array
    if (!quote) {
      return res.status(200).json({
        success: true,
        status: 404,
        message: "No Quote found",
        information: {
          quote: [],
        },
      });
    }

    // If quote is found, return it in the response
    return res.status(200).json({
      success: true,
      status: 200,
      message: "Quote retrieved successfully",
      information: {
        quote, // Wrap in an array to maintain consistency
      },
    });
  } catch (error) {
    console.error("Error fetching Quote:", error);
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
  getQuoteById,
};

module.exports = quote;

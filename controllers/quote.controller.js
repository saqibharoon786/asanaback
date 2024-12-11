const express = require("express");
const companyModel = require("../models/company/companyIndex.model");

const createQuote = async (req, res) => {
  try {
    const user = req.user;
    const name = req.user.name;
    var quote_TotalPrice = 0;
    var tax = 0.05;

    var product_Tax = 0;
    var product_TaxAmount = 0;
    var product_DiscountedAmount = 0;

    // Destructure data from request body
    var { quote_Creater, quote_Client, quote_Products, quote_Details } = req.body;

    // Validation: Check if the client and products are provided
    if (!quote_Creater || !quote_Client || !quote_Products || quote_Products.length === 0) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Creator details, client details, and at least one product are required.",
      });
    }

    // Loop through each product in quote_Products array
    for (var item of quote_Products) {
      product_DiscountedAmount = 0;
      product_TaxAmount = 0;
      var { product, quantity, product_Price, product_Discount } = item;

      // Find product in the database
      var dbProduct = await companyModel.Product.findOne({
        product_Name: product,
      });

      if (!dbProduct) {
        return res.status(404).json({
          success: false,
          status: 404,
          message: `Product '${product}' not found in the database.`,
        });
      }

      product_Tax = product_Price * quantity * tax;
      item.product_Tax = product_Tax;
      product_Price = (product_Price * quantity) + product_Tax;
      product_DiscountedAmount = product_Price * (product_Discount / 100);
      product_Price = product_Price - product_DiscountedAmount;
      item.product_FinalAmount = product_Price;

      quote_TotalPrice += item.product_FinalAmount;
    }
    // Prepare quote details
    var newQuoteDetails = {
      dateCreated: new Date(),
      status: quote_Details?.status || "Pending", // Default to "Pending" if not provided
    };

    // Create a new quote document
    var newQuote = await companyModel.Quote.create({
      quote_Creater,
      quote_Client,
      quote_Products,
      quote_TotalPrice,
      quote_Details: newQuoteDetails,
    });

    var quote_Identifier;

    if (name) {
      const namePart = name.substring(0, 2).toUpperCase(); // Get first two characters of the name and convert to uppercase
      const idPart = newQuote._id.toString().slice(-4);  // Get last 4 characters of the newQuote._id
      quote_Identifier = `${namePart}-${idPart}`;
    } else {
      quote_Identifier = newQuote._id.toString();
    }
    
    // Attach the identifier to the document (if needed)
    newQuote.quote_Identifier = quote_Identifier;
    await newQuote.save();

    // Send response with the created quote
    return res.status(200).json({
      success: true,
      status: 200,
      message: "Quote created successfully",
      information: {
        newQuote,
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
    var Quotes = await companyModel.Quote.find();

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
    var { quoteId } = req.params;

    // Fetch the quote by ID using findById
    var quote = await companyModel.Quote.findById(quoteId);

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

const express = require("express");
const companyModel = require("../models/company/companyIndex.model");

const createQuote = async (req, res) => {
  const companyId = req.user.companyId;
  try {
    const user = req.user;
    const {
      quote_Client,
      quote_SalesPerson,    
      quote_Products,
      quote_Details,
      quote_InitialPayment,
      quote_BeforeTaxPrice,
      quote_TotalTax,
      quote_AfterDiscountPrice,
      quote_Subject,
      quote_Project,
      quote_LeadId,
      quote_Date,
      quote_ExpiryDate,
    } = req.body;

    console.log("here");
    // Generate unique quote identifier
    const quoteCount = await companyModel.Quote.countDocuments();
    const quote_Identifier = `${user.userId}-${quoteCount + 1}`;

    const newQuoteDetails = {
      dateCreated: new Date(),
      status: quote_Details?.status || "Pending",
    };

    const quote_ImagePath = `/uploads/quotes/${req.file.filename}`;

    // Save quote
    const newQuote = await companyModel.Quote.create({
      companyId,  
      quote_SalesPerson,
      quote_Identifier,
      quote_Subject,
      quote_Project,
      quote_Creater: user.userId,
      quote_Client,
      quote_Products, // Pass products directly, including discount fields
      quote_BeforeTaxPrice,
      quote_TotalTax,
      quote_Image: { filePath: quote_ImagePath },
      quote_AfterDiscountPrice,
      quote_InitialPayment,
      quote_Details: newQuoteDetails,
      quote_LeadId: quote_LeadId || "",
      quote_Date,
      quote_ExpiryDate,
    });

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
    const companyId = req.user.companyId;
    var Quotes = await companyModel.Quote.find({companyId ,deleted: false });

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
    const companyId = req.user.companyId;
    var { quoteId } = req.params;

    // Fetch the quote by ID using findById
    var quote = await companyModel.Quote.findById({companyId,
      _id : quoteId});

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

const approveQuoteById = async (req, res) => {
  try {
    const companyId = req.user.companyId;
    const user = req.user;
    const { quoteId } = req.params;

    // Fetch the quote by ID using findById
    const quote = await companyModel.Quote.findById({companyId,
      _id: quoteId});

    // If no quote is found, return a message with an empty array
    if (!quote) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "No Quote found with this ID",
      });
    }

    // Ensure the quote is not already accepted
    if (quote.quote_Details.status === "Approved") {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Quote has already been accepted.",
      });
    }

    quote.quote_Details.status = "Approved";
    const updatedQuote = await quote.save();
    
    // Check if the quote save was successful
    if (!updatedQuote) {
      return res.status(500).json({
        success: false,
        status: 500,
        message: "Failed to update quote status",
      });
    }

    const newInvoice = await companyModel.Invoice.create({
      companyId: companyId,
      invoice_Identifier: quote.quote_Identifier,
      invoice_Creater: quote.quote_Creater,
      invoice_Client: quote.quote_Client,
      invoice_Products: quote.quote_Products,
      invoice_TotalPrice: quote.quote_TotalPrice,
      invoice_Details: {
        status: "Unpaid",
        dateCreated: Date.now(),
      },
    });
    
    // Correcting the loop to update product stock quantities
    for (const item of newInvoice.invoice_Products) {
      const product = await companyModel.Product.findOne({ product_Name: item.product, deleted: false });
    
      if (product) {
        product.product_StockQuantity -= item.quantity; // Decrease stock quantity
        await product.save(); // Save the updated product
      }
    }

    // Return the success response with both quote and invoice details
    return res.status(200).json({
      success: true,
      status: 200,
      message: "Quote Approved and Invoice Created successfully",
      information: {
        quote: updatedQuote,
        invoice: newInvoice,
      },
    });
  } catch (error) {
    console.error("Error in accepting quote:", error);

    // Improved error message
    return res.status(500).json({
      success: false,
      status: 500,
      message: error.message || "An error occurred while processing the quote.",
    });
  }
};

const deleteQuote = async (req, res) => {
  try {
    const companyId = req.user.companyId;
    const { quoteId } =  req.params;

    if (!quoteId) {
      return res.status(400).json({
        success: false,
        message: "Please provide the quote ID."
      });
    }

    // Find the quote by ID and mark it as deleted
    const quote = await companyModel.Quote.findById({companyId,
      _id: quoteId});
    if (!quote) {
      return res.status(404).json({
        success: false,
        message: "Quote not found."
      });
    }

    // Mark the quote as deleted by updating the 'deleted' field to true
    await companyModel.Quote.updateOne(
      { _id: quoteId },
      { $set: { deleted: true } }
    );

    return res.status(200).json({
      success: true,
      message: "Quote deleted successfully."
    });
  } catch (error) {
    console.error("Error deleting quote:", error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const quote = {
  createQuote,
  getAllQuotes,
  getQuoteById,
  approveQuoteById,
  deleteQuote,  
};

module.exports = quote;

const express = require("express");
const companyModel = require("../models/company/companyIndex.model");
const utils = require("../utils/utilsIndex");

const createQuote = async (req, res) => {
  const companyId = req.user.companyId;

  try {
    const user = req.user;
    const {
      quote_Customer,
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
      quote_ReferenceNumber,
    } = req.body;

    const parsedQuoteProducts = JSON.parse(quote_Products);

    // Generate unique quote identifier
    const quote_Identifier = await utils.generateUniqueQuoteId();

    const newQuoteDetails = {
      dateCreated: new Date(),
      status: quote_Details?.status || "Pending",
    };

    var quote_ImagePath = "";
    if (req.file) {
      quote_ImagePath = `/uploads/quotes/${req.file.filename}`;
    }

    // Save quote
    const newQuote = await companyModel.Quote.create({
      companyId,
      quote_Customer,
      quote_SalesPerson,
      quote_Identifier,
      quote_Subject,
      quote_Project,
      quote_Creater: user.userId,
      quote_Products: parsedQuoteProducts, // Pass products directly, including discount fields
      quote_BeforeTaxPrice,
      quote_TotalTax,
      quote_ReferenceNumber,
      quote_AfterDiscountPrice,
      quote_InitialPayment,
      quote_Details: newQuoteDetails,
      quote_LeadId: quote_LeadId || "",
      quote_Date,
      quote_ExpiryDate,
      quote_Image: {
        filePath: quote_ImagePath,
      },
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

const EditQuote = async (req, res) => {
  const companyId = req.user.companyId;
  try {
    const user = req.user;
    const { quoteId } = req.params; // Quote ID from request parameters
    const {
      quote_Customer,
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
      quote_ReferenceNumber,
    } = req.body;

    // Parse the quote products if they are passed as a JSON string
    const parsedQuoteProducts = JSON.parse(quote_Products || "[]");

    // Handle uploaded image if a new image is provided
    let quote_ImagePath = "";
    if (req.file) {
      quote_ImagePath = `/uploads/quotes/${req.file.filename}`;
    }

    // Find the existing quote
    const existingQuote = await companyModel.Quote.findById(quoteId);
    if (!existingQuote) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "Quote not found",
      });
    }

    // Update quote details
    const updatedQuote = await companyModel.Quote.findByIdAndUpdate(
      quoteId,
      {
        $set: {
          companyId,
          quote_Customer: quote_Customer || existingQuote.quote_Customer,
          quote_SalesPerson:
            quote_SalesPerson || existingQuote.quote_SalesPerson,
          quote_Products:
            parsedQuoteProducts.length > 0
              ? parsedQuoteProducts
              : existingQuote.quote_Products,
          quote_BeforeTaxPrice:
            quote_BeforeTaxPrice || existingQuote.quote_BeforeTaxPrice,
          quote_TotalTax: quote_TotalTax || existingQuote.quote_TotalTax,
          quote_AfterDiscountPrice:
            quote_AfterDiscountPrice || existingQuote.quote_AfterDiscountPrice,
          quote_InitialPayment:
            quote_InitialPayment || existingQuote.quote_InitialPayment,
          quote_Subject: quote_Subject || existingQuote.quote_Subject,
          quote_Project: quote_Project || existingQuote.quote_Project,
          quote_LeadId: quote_LeadId || existingQuote.quote_LeadId,
          quote_Date: quote_Date || existingQuote.quote_Date,
          quote_ExpiryDate: quote_ExpiryDate || existingQuote.quote_ExpiryDate,
          quote_ReferenceNumber:
            quote_ReferenceNumber || existingQuote.quote_ReferenceNumber,
          quote_Details: {
            ...existingQuote.quote_Details,
            status:
              quote_Details?.status || existingQuote.quote_Details?.status,
          },
          ...(quote_ImagePath && {
            quote_Image: { filePath: quote_ImagePath },
          }), // Only update image if a new one is uploaded
        },
      },
      { new: true } // Return the updated document
    );

    return res.status(200).json({
      success: true,
      status: 200,
      message: "Quote updated successfully",
      information: {
        updatedQuote,
      },
    });
  } catch (error) {
    console.error("Error updating quote:", error);
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

    // Fetch all quotes for the company
    const quotes = await companyModel.Quote.find({ companyId, deleted: false });

    // // If no quotes are found, return an empty array
    // if (!quotes || quotes.length === 0) {
    //   return res.status(200).json({
    //     success: true,
    //     status: 200,
    //     message: "No quotes found",
    //     information: {
    //       quotes: [],
    //     },
    //   });
    // }

    // // Fetch customer details for each quote and attach them to the quote
    // const quotesWithCustomerDetails = await Promise.all(
    //   quotes.map(async (quote) => {
    //     // Fetch customer details for the quote's customer
    //     const customer = await companyModel.Customer.findOne({
    //       _id: quote.quote_Customer,
    //       deleted: false,
    //     });

    //     // Attach customer details to the quote
    //     return {
    //       ...quote._doc,
    //       quote_CustomerDetails: customer || null,
    //     };
    //   })
    // );

    return res.status(200).json({
      success: true,
      status: 200,
      message: "Quotes and customer details retrieved successfully",
      information: {
        quotes: quotes,
      },
    });
  } catch (error) {
    console.error("Error fetching quotes:", error);
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
    const { quoteId } = req.params;

    // Fetch the quote by ID using findById
    const quote = await companyModel.Quote.findById(quoteId);
    const customer = await companyModel.Customer.findById(quote.quote_Customer);

    // If quote is found, return it in the response along with the customer
    return res.status(200).json({
      success: true,
      status: 200,
      message: "Quote retrieved successfully",
      information: {
        quote,
        customer,
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
    const quote = await companyModel.Quote.findById({
      companyId,
      _id: quoteId,
    });

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
      invoice_Client: quote.quote_Customer,
      invoice_Products: quote.quote_Products,
      invoice_TotalPrice: quote.quote_TotalPrice,
      invoice_Details: {
        status: "Unpaid",
        dateCreated: Date.now(),
      },
    });

    // Correcting the loop to update product stock quantities
    for (const item of newInvoice.invoice_Products) {
      const product = await companyModel.Product.findOne({
        product_Name: item.product,
        deleted: false,
      });

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
    const { quoteId } = req.params;

    if (!quoteId) {
      return res.status(400).json({
        success: false,
        message: "Please provide the quote ID.",
      });
    }

    // Find the quote by ID and mark it as deleted
    const quote = await companyModel.Quote.findById({
      companyId,
      _id: quoteId,
    });
    if (!quote) {
      return res.status(404).json({
        success: false,
        message: "Quote not found.",
      });
    }

    // Mark the quote as deleted by updating the 'deleted' field to true
    await companyModel.Quote.updateOne(
      { _id: quoteId },
      { $set: { deleted: true } }
    );

    return res.status(200).json({
      success: true,
      message: "Quote deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting quote:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const quote = {
  createQuote,
  EditQuote,
  getAllQuotes,
  getQuoteById,
  approveQuoteById,
  deleteQuote,
};

module.exports = quote;

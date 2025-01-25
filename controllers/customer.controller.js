const express = require("express");
const companyModel = require("../models/company/companyIndex.model");

const createCustomer = async (req, res) => {
    const companyId = req.user.companyId;
    const userId = req.user.userId;
  
    try {
      const {
        customer_Type,
        customer_PrimaryInfo, // Should match schema
        customer_CompanyName,
        customer_DisplayName,
        customer_Email,
        customer_Contact,
        customer_Currency,
        customer_TaxRate,
        customer_OpeningBalance,
        customer_PaymentTerms,
        customer_EnablePortal,
        customer_Address,
        customer_ContactPersons,
        customer_Remarks,
      } = req.body;
  
      let customer_ImagePath = "";
      if (req.file && req.file.filename) {
        customer_ImagePath = `/uploads/customers/${req.file.filename}`;
      }
      
      // Save customer
      const newCustomer = await companyModel.Customer.create({
        companyId,
        customer_Type,
        customer_PrimaryInfo, // Match schema structure
        customer_CompanyName,
        customer_DisplayName,
        customer_Email,
        customer_Contact,
        customer_Currency,
        customer_TaxRate,
        customer_OpeningBalance,
        customer_PaymentTerms, // Match schema structure
        customer_EnablePortal,
        customer_Address,
        customer_ContactPersons, // Ensure proper structure and validation before saving
        customer_Remarks,
        customer_Documents: [
          {
            filePath: customer_ImagePath,
          },
        ],
        customer_CreatedBy: {
          userId, // Match schema structure
        },
      });
  
      return res.status(200).json({
        success: true,
        status: 200,
        message: "Customer created successfully",
        information: {
          newCustomer,
        },
      });
    } catch (error) {
      console.error("Error creating customer:", error);
      return res.status(500).json({
        success: false,
        status: 500,
        message: error.message,
      });
    }
  };  

const customer = {
  createCustomer,
};

module.exports = customer;

const express = require("express");
const companyModel = require("../models/company/companyIndex.model");

const createCustomer = async (req, res) => {
    const companyId = req.user.companyId;
    const userId = req.user.userId;
  
    try {
      const {
        customer_GeneralDetails,
        customer_OtherDetails,
        customer_Address,
        customer_ContactPersons,
        customer_Remarks,
      } = req.body;
  
      let customer_ImagePath = "";
      if (req.file && req.file.filename) {
        customer_ImagePath = `/uploads/customers/${req.file.filename}`;
      }
      
      console.log(customer_GeneralDetails);
      // Save customer
      const newCustomer = await companyModel.Customer.create({
        companyId,
        customer_GeneralDetails,
        customer_OtherDetails,
        customer_Address,
        customer_ContactPersons, // Ensure proper structure and validation before saving
        customer_Remarks,
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

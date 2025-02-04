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
      deleted: false,
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

const getAllCustomers = async (req, res) => {
  try {
    const companyId = req.user.companyId;

    const customers = await companyModel.Customer.find({
      companyId,
      deleted: false,
    });
    return res.status(200).json({
      success: true,
      status: 200,
      message: "Customers retreived successfully",
      information: {
        customers,
      },
    });
  } catch (error) {
    console.error("Error fetching customers:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch customers",
      error: error.message,
    });
  }
};

const getCustomerById = async (req, res) => {
  try {
    const { customerId } = req.params;

    if (!customerId) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Customer ID is required",
      });
    }

    // Fetch customer by customerId and companyId
    const customer = await companyModel.Customer.findOne({
      _id: customerId,
    });

    if (!customer) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "No Customer found",
        information: {
          customer: {},
        },
      });
    }

    // Return the full customer information
    return res.status(200).json({
      success: true,
      status: 200,
      message: "Customer retrieved successfully",
      information: {
        customer,
      },
    });
  } catch (error) {
    console.error("Error fetching customer:", error);
    return res.status(500).json({
      success: false,
      status: 500,
      message: error.message,
    });
  }
};

const updateCustomerById = async (req, res) => {
  const { customerId } = req.params;
  const companyId = req.user.companyId;

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

    // Build the update data. Include customer_ImagePath if provided.
    const updateData = {
      customer_GeneralDetails,
      customer_OtherDetails,
      customer_Address,
      customer_ContactPersons,
      customer_Remarks,
      ...(customer_ImagePath && { customer_ImagePath }),
    };

    // Use findOneAndUpdate to update the customer document and return the updated document.
    const updatedCustomer = await companyModel.Customer.findOneAndUpdate(
      { _id: customerId, companyId },
      { $set: updateData },
      { new: true }
    );

    if (!updatedCustomer) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "Customer not found",
      });
    }

    return res.status(200).json({
      success: true,
      status: 200,
      message: "Customer updated successfully",
      information: {
        customer: updatedCustomer,
      },
    });
  } catch (error) {
    console.error("Error updating customer:", error);
    return res.status(500).json({
      success: false,
      status: 500,
      message: error.message,
    });
  }
};

const customer = {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomerById
};

module.exports = customer;

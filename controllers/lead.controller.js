const express = require("express");
const companyModel = require("../models/company/companyIndex.model"); // Adjust the import to point to the correct Lead model

const getAllLeads = async (req, res) => {
  try {
    const allLeads = await companyModel.Lead.find();
    return res.status(201).json({
      success: true,
      status: 201,
      message: "All Leads retreived successfully",
      information: {
        allLeads
      },
    });
  } catch (error) {
    console.error("Error creating lead:", error);
    return res.status(500).json({
      success: false,
      status: 500,
      message: error.message,
    });
  }
};

const createLead = async (req, res) => {
  try {
    const {
      lead_Creater,
      lead_Name,
      lead_Scope,
      lead_InstallationTime,
      lead_ProblemDefinition,
      lead_BankTransfer,
      lead_DateMentioned,
      lead_Reviews,
      lead_Client,
    } = req.body;

    // Validate required fields
    if (
      !lead_Name ||
      !lead_Creater ||
      !lead_Creater.name ||
      !lead_Creater.email ||
      !lead_Creater.phone ||
      !lead_Scope ||
      !lead_InstallationTime ||
      !lead_ProblemDefinition ||
      !lead_BankTransfer ||
      !lead_DateMentioned ||
      !lead_Client ||
      !lead_Client.client_Name ||
      !lead_Client.client_Email ||
      !lead_Client.client_Address ||
      !lead_Client.client_Contact
    ) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "All fields are required",
      });
    }

    // Check if a similar lead already exists (based on client name and scope)
    const existingLead = await companyModel.Lead.findOne({
      lead_Name,
    });

    if (existingLead) {
      return res.status(409).json({
        success: false,
        status: 409,
        message: "Lead with similar details already exists",
      });
    }

    // Create new lead document
    const savedLead = await companyModel.Lead.create({
      lead_Name,
      lead_Creater,
      lead_Scope,
      lead_InstallationTime,
      lead_ProblemDefinition,
      lead_BankTransfer,
      lead_DateMentioned,
      lead_Reviews,
      lead_Client,
    });

    return res.status(201).json({
      success: true,
      status: 201,
      message: "Lead created successfully",
      information: {
        savedLead
      },
    });
  } catch (error) {
    console.error("Error creating lead:", error);
    return res.status(500).json({
      success: false,
      status: 500,
      message: error.message,
    });
  }
};

const lead = {
  createLead,
  getAllLeads
};

module.exports = lead;
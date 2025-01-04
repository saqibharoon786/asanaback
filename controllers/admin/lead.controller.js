const express = require("express");
const companyModel = require("../../models/company/companyIndex.model"); // Adjust the import to point to the correct Lead model

const getAllLeads = async (req, res) => {
  try {
    const companyId = req.user.companyId;
    const allLeads = await companyModel.Lead.find({companyId, deleted: false });
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

const approveLeadById = async (req, res) => {
  try {
    const companyId = req.user.companyId;
    const { leadId } = req.params;

    // Fetch the lead by ID and companyId
    const lead = await companyModel.Lead.findOne({
      _id: leadId,
      companyId,
    });

    // Check if the lead exists
    if (!lead) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "Lead not found.",
      });
    }

    // Ensure the lead is not already approved
    if (lead.lead_Details.status === "Approved") {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Lead has already been approved.",
      });
    }

    // Update the lead status to "Approved"
    lead.lead_Details.status = "Approved";
    const updatedLead = await lead.save();

    // Return the success response with the updated lead details
    return res.status(200).json({
      success: true,
      status: 200,
      message: "Lead approved successfully.",
      information: {
        lead: updatedLead,
      },
    });
  } catch (error) {
    console.error("Error approving lead:", error);

    // Improved error message
    return res.status(500).json({
      success: false,
      status: 500,
      message: error.message || "An error occurred while processing the request.",
    });
  }
};


const createLead = async (req, res) => {
  try {
    const companyId = req.user.companyId;
    const user = req.user; 
    const {
      lead_Name,
      lead_Scope,
      lead_InstallationTime,
      lead_ProblemDefinition,
      lead_BankTransfer,
      lead_DateMentioned,
      lead_Reviews,
      lead_Client,
    } = req.body;

    // Create a new lead document
    const savedLead = await companyModel.Lead.create({
      companyId,
      lead_Name,
      lead_Creater: {
        name: user.name,
        email: user.email,
        phone: user.contact || user.phone, 
      },
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

const getLeadById = async (req, res) => {
  try {
    const companyId = req.user.companyId;
    const { leadId } = req.params;

    // Fetch the lead using leadId and companyId
    const lead = await companyModel.Lead.findOne({
      _id: leadId,
      companyId,
    });

    if (!lead) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "No Lead found.",
        information: { lead: [] },
      });
    }

    return res.status(200).json({
      success: true,
      status: 200,
      message: "Lead retrieved successfully.",
      information: { lead },
    });
  } catch (error) {
    console.error("Error fetching lead by ID:", error);
    return res.status(500).json({
      success: false,
      status: 500,
      message: error.message,
    });
  }
};



const deleteLead = async (req, res) => {
  try {
    const companyId = req.user.companyId;
    const { leadId } = req.params;
    if (!leadId) {
      return res.status(400).json({
        success: false,
        message: "Please provide the lead ID.",
      });
    }

    // Find the lead by ID and mark it as deleted
    const lead = await companyModel.Lead.findById({
      companyId, 
      _id: leadId,
    });
    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found.",
      });
    }

    // Mark the lead as deleted by updating the 'deleted' field to true
    await companyModel.Lead.updateOne(
      { _id: leadId },
      { $set: { deleted: true } }
    );

    return res.status(200).json({
      success: true,
      message: "Lead deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting lead:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "An error occurred while deleting the lead.",
    });
  }
};

const lead = {
  createLead,
  getAllLeads,
  getLeadById,
  deleteLead,
  approveLeadById
};

module.exports = lead;
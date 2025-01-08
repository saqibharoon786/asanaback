const express = require("express");
const companyModel = require("../models/company/companyIndex.model"); // Adjust the import to point to the correct Lead model


const createLead = async (req, res) => {
  try {
    const companyId = req.user.companyId;
    const userId = req.user.userId; 
    const user = req.user; 
    const {
      lead_Client,
      lead_Organization,
      lead_Title,
      lead_Source,
    } = req.body;

    // Create a new lead document
    const savedLead = await companyModel.Lead.create({
      companyId,
      lead_Creater : userId,
      lead_Client,
      lead_Organization,
      lead_Title,
      lead_Source,
      lead_Label: "Hot",
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

const addOptionalDataToLead = async (req, res) => {
  try {
    const { leadId } = req.params;
    const {
      lead_Demography,
      lead_Behaviour,
      lead_Action,
      lead_AttributesOrAction,
      lead_Notes,
      lead_Pipeline, // Accepting lead_Pipeline updates
    } = req.body;

    // Find the lead by ID
    const lead = await companyModel.Lead.findById(leadId);
    if (!lead) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "Lead not found",
      });
    }

    // Update the lead with optional data
    if (lead_Demography) {
      lead.lead_Demography = { ...lead.lead_Demography, ...lead_Demography };
    }
    if (lead_Behaviour) {
      lead.lead_Behaviour = { ...lead.lead_Behaviour, ...lead_Behaviour };
    }
    if (lead_Action) {
      lead.lead_Action = { ...lead.lead_Action, ...lead_Action };
    }
    if (lead_AttributesOrAction) {
      lead.lead_AttributesOrAction = { ...lead.lead_AttributesOrAction, ...lead_AttributesOrAction };
    }
    if (lead_Notes) {
      lead_Notes.forEach(note => {
        lead.lead_Notes.push({
          note: note, // Add the note content
          note_CreatedAt: new Date(), // Explicitly set the creation date
        });
      });
    }
    if (lead_Pipeline) {
      lead_Pipeline.forEach(stage => {
        lead.lead_Pipeline.push({
          stage_Name: stage.stage_Name, // Add the stage name
          stage_Detail: stage.stage_Detail, // Add the stage detail
          stage_CreatedAt: new Date(), // Explicitly set the creation date
        });
      });
    }

    await lead.save(); // Save the updated lead document

    return res.status(200).json({
      success: true,
      status: 200,
      message: "Optional data added successfully",
      updatedLead: lead,
    });
  } catch (error) {
    console.error("Error adding optional data:", error);
    return res.status(500).json({
      success: false,
      status: 500,
      message: error.message,
    });
  }
};
const getAllLeads = async (req, res) => {
  try {
    const companyId = req.user.companyId;
    const allLeads = await companyModel.Lead.find({ companyId: companyId, deleted: false });
    const leadCreators = allLeads.map(lead => lead.lead_Creater);
    const users = await companyModel.User.find({ userId: { $in: leadCreators } });
    const userMap = users.reduce((map, user) => {
      map[user.userId] = user.name;
      return map;
    }, {});

    // Map each lead to include the creator's name
    const leadsWithCreatorName = allLeads.map(lead => ({
      ...lead._doc,
      lead_CreaterName: userMap[lead.lead_Creater] || "Unknown",
    }));

    return res.status(201).json({
      success: true,
      status: 201,
      message: "All Leads retrieved successfully",
      information: {
        allLeads: leadsWithCreatorName
      },
    });
  } catch (error) {
    console.error("Error retrieving leads:", error);
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
  approveLeadById,
  addOptionalDataToLead
};

module.exports = lead;
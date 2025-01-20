const express = require("express");
const companyModel = require("../models/company/companyIndex.model");
const utils = require("../utils/utilsIndex");

const createLead = async (req, res) => {
  try {
    const companyId = req.user.companyId;
    const userId = req.user.userId;
    const {
      lead_Client,
      lead_Organization,
      lead_ClientContactPerson,
      lead_Title,
      lead_Source,
      lead_Scope,
    } = req.body;

    const leadIdentifier = await utils.generateUniqueLeadId();

    // Create a new lead document
    const savedLead = await companyModel.Lead.create({
      companyId,
      leadIdentifier,
      lead_Creater: userId,
      lead_Client,
      lead_ClientContactPerson,
      lead_Organization,
      lead_Title,
      lead_Source,
      lead_Label: "Hot",
      lead_Scope,
      lead_TransferAndAssign: [
        {
          lead_TransferredByUserId: userId,
          lead_AssignedToUserId: userId,
        },
      ],
    });

    return res.status(201).json({
      success: true,
      status: 201,
      message: "Lead created successfully",
      information: {
        savedLead,
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
      lead_InteractionHistory,
    } = req.body;

    // Fetch the lead by ID to check existence before updating
    const lead = await companyModel.Lead.findById(leadId);
    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    // Prepare update object
    const update = {};
    if (lead_Demography) {
      update["lead_Demography"] = {
        ...lead.lead_Demography,
        ...lead_Demography,
      };
    }
    if (lead_Behaviour) {
      update["lead_Behaviour"] = { ...lead.lead_Behaviour, ...lead_Behaviour };
    }
    if (lead_Action) {
      update["lead_Action"] = { ...lead.lead_Action, ...lead_Action };
    }
    if (lead_AttributesOrAction) {
      update["lead_AttributesOrAction"] = {
        ...lead.lead_AttributesOrAction,
        ...lead_AttributesOrAction,
      };
    }
    if (lead_Notes) {
      // Handle array updates for notes
      update["$push"] = { lead_Notes: { $each: lead_Notes } };
    }
    if (lead_InteractionHistory) {
      // Handle array updates for Interaction History
      update["$push"] = update["$push"] || {};
      update["$push"]["lead_InteractionHistory"] = {
        $each: lead_InteractionHistory,
      };
    }

    // Perform the update atomically
    const updatedLead = await companyModel.Lead.findByIdAndUpdate(
      leadId,
      update,
      { new: true }
    );
    if (!updatedLead) {
      return res.status(500).json({
        success: false,
        message: "Failed to update the lead",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Optional data added successfully",
      data: updatedLead,
    });
  } catch (error) {
    console.error("Error adding optional data:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllLeads = async (req, res) => {
  try {
    const companyId = req.user.companyId;
    const allLeads = await companyModel.Lead.find({
      companyId: companyId,
      deleted: false,
    });

    const leadCreators = allLeads.map((lead) => lead.lead_Creater);
    const leadTransferredByUserIds = allLeads
      .map(
        (lead) =>
          lead.lead_TransferAndAssign[lead.lead_TransferAndAssign.length - 1]
            ?.lead_TransferredByUserId
      )
      .filter(Boolean);

    const leadAssignedToUserIds = allLeads
      .map(
        (lead) =>
          lead.lead_TransferAndAssign[lead.lead_TransferAndAssign.length - 1]
            ?.lead_AssignedToUserId
      )
      .filter(Boolean);

    const leadPreviousUserIds = allLeads
      .map(
        (lead) =>
          lead.lead_TransferAndAssign[lead.lead_TransferAndAssign.length - 2]
            ?.lead_AssignedToUserId
      )
      .filter(Boolean);

    // Fetch users for creators, transferred by users, and assigned to users
    const users = await companyModel.User.find({
      userId: {
        $in: [
          ...leadCreators,
          ...leadTransferredByUserIds,
          ...leadAssignedToUserIds,
          ...leadPreviousUserIds,
        ],
      },
    });

    const userMap = users.reduce((map, user) => {
      map[user.userId] = user.name;
      return map;
    }, {});

    // Map each lead to include the creator's name, transferred by, and assigned to user names
    const leadsWithUserNames = allLeads.map((lead) => ({
      ...lead._doc,
      lead_CreaterName: userMap[lead.lead_Creater] || "Unknown",
      lead_TransferredByUserName:
        userMap[
          lead.lead_TransferAndAssign[lead.lead_TransferAndAssign.length - 1]
            ?.lead_TransferredByUserId
        ] || "Unknown",
      lead_PreviousOwnerName:
        userMap[
          lead.lead_TransferAndAssign[lead.lead_TransferAndAssign.length - 2]
            ?.lead_AssignedToUserId
        ] || "No Previous Owner",
      lead_AssignedToUserName:
        userMap[
          lead.lead_TransferAndAssign[lead.lead_TransferAndAssign.length - 1]
            ?.lead_AssignedToUserId
        ] || "Unknown",
    }));

    return res.status(201).json({
      success: true,
      status: 201,
      message: "All Leads retrieved successfully",
      information: {
        allLeads: leadsWithUserNames,
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
      message:
        error.message || "An error occurred while processing the request.",
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

    // Extract lead_TransferAndAssign
    const leadTransferAndAssign = lead.lead_TransferAndAssign || [];

    // Fetch user details based on IDs in lead_TransferAndAssign
    const userIds = [
      ...new Set(
        leadTransferAndAssign.flatMap((transfer) => [
          transfer.lead_TransferredByUserId,
          transfer.lead_AssignedToUserId,
        ])
      ),
    ];

    // Simulating user model lookup (Replace with actual DB query to get users)
    const users = await companyModel.User.find(
      { userId: { $in: userIds } },
      "userId name"
    );

    const userMap = users.reduce((map, user) => {
      map[user.userId] = user.name;
      return map;
    }, {});

    // Map transfer history with user names
    const leadTransferHistoryUsersNames = leadTransferAndAssign.map(
      (transfer) => ({
        transferredBy: userMap[transfer.lead_TransferredByUserId] || "Unknown",
        assignedTo: userMap[transfer.lead_AssignedToUserId] || "Unknown",
        transferredAt: transfer.transferredAt,
      })
    );

    // Return the lead with additional transfer history users
    return res.status(200).json({
      success: true,
      status: 200,
      message: "Lead retrieved successfully.",
      information: {
        lead,
        leadTransferHistoryUsersNames,
      },
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

const addNote = async (req, res) => {
  try {
    const { leadId } = req.params;
    const { note } = req.body;

    // Find the lead by ID and update the lead_Notes array
    const updatedLead = await companyModel.Lead.findByIdAndUpdate(
      leadId,
      {
        $push: {
          lead_Notes: { note }, // Add the new note to the array
        },
      },
      { new: true } // Return the updated document
    );

    if (!updatedLead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Note added successfully.",
      data: updatedLead, // Return the updated lead
    });
  } catch (error) {
    console.error("Error adding note:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "An error occurred while adding the note.",
    });
  }
};

const addInteractionHistoryDetail = async (req, res) => {
  try {
    const { leadId } = req.params; // Get the lead ID from the request parameters
    const { stage_Name, stage_Detail } = req.body; // Extract interaction history details from the request body

    // Validate the input
    if (!stage_Name || !stage_Detail) {
      return res.status(400).json({
        success: false,
        message: "Both stage_Name and stage_Detail are required.",
      });
    }

    // Update the lead document by pushing a new stage into lead_InteractionHistory
    const updatedLead = await companyModel.Lead.findByIdAndUpdate(
      leadId, // Use the leadId directly
      {
        $push: {
          lead_InteractionHistory: {
            stage_Name,
            stage_Detail,
            stage_CreatedAt: new Date(), // Optional, override default if needed
          },
        },
      },
      { new: true, useFindAndModify: false } // Return the updated document
    );

    // If no lead was found, return a 404 error
    if (!updatedLead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found.",
      });
    }

    // Respond with the updated lead
    return res.status(200).json({
      success: true,
      message: "Interaction History detail added successfully.",
      data: updatedLead,
    });
  } catch (error) {
    console.error("Error adding Interaction History detail:", error);
    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "An error occurred while adding the interaction history detail.",
    });
  }
};

const leadTransferred = async (req, res) => {
  try {
    const { leadId } = req.params;
    const user = req.user;
    const { receivedById } = req.body;

    const lead = await companyModel.Lead.findById(leadId);

    const salesDepartment = await companyModel.Department.findOne({
      companyId: user.companyId,
      department_Name: "Sales",
    });

    const salesEmployee = salesDepartment.department_Employees.find(
      (emp) => emp.userId === user.userId
    );

    if (!salesEmployee && user.access !== "Admin") {
      return res.status(404).json({
        success: false,
        message: "User not authorized to transfer the lead.",
      });
    }

    // Check if user is authorized as Admin or Team Lead
    if (
      user.access === "Admin" ||
      (salesEmployee && salesEmployee.employee_Designation === "Team Lead")
    ) {
      lead.lead_TransferAndAssign.push({
        lead_TransferredByUserId: user.userId,
        lead_AssignedToUserId: receivedById,
        transferredAt: new Date(),
      });
    }

    // Save the updated lead document
    await lead.save();

    return res.status(200).json({
      success: true,
      message: "Lead successfully transferred.",
      lead,
    });
  } catch (error) {
    console.error("Error transferring lead:", error);
    return res.status(500).json({
      success: false,
      message:
        error.message || "An error occurred while transferring the lead.",
    });
  }
};

const massTransferLeads = async (req, res) => {
  try {
    const { receivedById, leadIds } = req.body;
    const user = req.user;

    if (!Array.isArray(leadIds) || leadIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing leadIds array.",
      });
    }

    // Update each lead with the transfer details
    await companyModel.Lead.updateMany(
      { _id: { $in: leadIds } },
      {
        $push: {
          lead_TransferAndAssign: {
            lead_TransferredByUserId: user.userId,
            lead_AssignedToUserId: receivedById,
            transferredAt: new Date(),
          },
        },
      }
    );

    return res.status(200).json({
      success: true,
      message: "Leads successfully transferred.",
    });
  } catch (error) {
    console.error("Error transferring leads:", error);
    return res.status(500).json({
      success: false,
      message:
        error.message || "An error occurred while transferring the leads.",
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

const massDeleteLeads = async (req, res) => {
  try {
    let { leadIds } = req.body;

    // Update the "deleted" field of the leads
    await companyModel.Lead.updateMany(
      { _id: { $in: leadIds } },
      { $set: { deleted: true } }
    );

    return res.status(200).json({
      success: true,
      message: "Leads deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting leads:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "An error occurred while deleting the leads.",
    });
  }
};

const lead = {
  createLead,
  getAllLeads,
  getLeadById,
  approveLeadById,
  addOptionalDataToLead,
  addNote,
  addInteractionHistoryDetail,
  leadTransferred,
  massTransferLeads,
  deleteLead,
  massDeleteLeads,
};

module.exports = lead;

const mongoose = require("mongoose");

// Lead schema
const leadSchema = new mongoose.Schema(
  {
    companyId: { type: String },
    lead_Creater: {
      name: { type: String },
      email: { type: String },
      phone: { type: String }
    },
    lead_Client: {
      client_Name: { type: String },
      client_Email: { type: String },
      client_Address: { type: String },
      client_Contact: { type: Number },
    },
    lead_Name: {
      type: String,
    },
    lead_Scope: {
      type: String,
    },
    lead_InstallationTime: {
      type: Date,
    },
    lead_ProblemDefinition: {
      type: String,
    },
    lead_BankTransfer: {
      type: Date,
    },
    lead_DateMentioned: {
      type: String,
    },
    lead_Reviews: [{
      type: String,
    }],
    lead_Details: {
      dateCreated: { type: Date, default: Date.now },
      status: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending",
      },
    },
    deleted: { type: Boolean, default: false }  // Status field for soft delete,
  },
  { timestamps: true }
);

const Lead = mongoose.model("Lead", leadSchema);
module.exports = Lead;
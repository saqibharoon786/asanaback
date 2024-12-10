const mongoose = require("mongoose");

// Lead schema
const leadSchema = new mongoose.Schema(
  {
    lead_Creater: {
      name: { type: String },
      email: { type: String },
      phone: { type: String }
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
    lead_Client: {
      client_Name: { type: String },
      client_Email: { type: String },
      client_Address: { type: String },
      client_Contact: { type: Number },
    },
  },
  { timestamps: true }
);

const Lead = mongoose.model("Lead", leadSchema);
module.exports = Lead;
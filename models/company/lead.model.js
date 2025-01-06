const mongoose = require("mongoose");

// Lead schema
const leadSchema = new mongoose.Schema(
  {
    companyId: { type: String },
    lead_TransferrredBy: [{
      userId: {
        type: String,
      }
    }],
    lead_Creater: {
      name: { type: String },
      email: { type: String },
      phone: { type: String },
      userId: { type: String },
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
    lead_Status: {
      type: String,
      enum: [ "Prospect", "Quolified", "Close-Won"],
    },
    lead_InteractionHistory: [{
      message: {
        type: String,
      },
      enum: [ "Email", "Call", "Meeting", "Notes"],
    }],
    // Lead score calcualted by the following attributes -- START
    lead_Score: {
      type: String,
      enum: [ "Hot", "Warm", "Cold"],
    },
    lead_Demography : {
        company_Size: {
          type: Number,
        },
        industry_Match: {
          type: String,
        },
        location: {
          type: String,
        },
        job_Title: {
          type: String,
        },
        misaligned_Demographics: {
          type: Boolean,
        }
    },
      lead_Behaviour : {
        visited_Pricing_Page: {
          type: Number,
        },
        downloaded_White_Paper: {
          type: String,
        },
        repeated_Website_Visits: {
          type: String,
        },
        ignore_Email_or_Unsubscribed: {
          type: String,
        },
    },
      lead_Action : {
        requested_Demo_or_Quote: {
          type: Boolean,
        },
        attended_Sales_Call: {
          type: Boolean,
        },
        opted_for_Trial_Services: {
          type: Boolean,
        },
    },
      lead_AttributesOrAction : {
        invalid_Email_or_ContactInfo: {
          type: Boolean,
        },
        competitor: {
          type: String,
        },
        budget_Below_Threshold: {
          type: Boolean,
        },
    },
    // Lead score calcualted by the following attributes -- END
    lead_Notes: [{
      type: String,
      note_CreatedAt: Date.now(), 
    }],

    deleted: { type: Boolean, default: false }  // Status field for soft delete,
  },
  { timestamps: true }
);

const Lead = mongoose.model("Lead", leadSchema);
module.exports = Lead;
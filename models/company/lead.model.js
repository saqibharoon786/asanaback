const mongoose = require("mongoose");

// Lead schema
const leadSchema = new mongoose.Schema(
  {
    companyId: { type: String },
    lead_TransferredBy: [
      {
        userId: {
          type: String,
        },
        transferredAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    lead_Creater: {
      type: String,
    },
    lead_Client: {
      client_Name: { type: String },
      client_Email: { type: String },
      client_Address: { type: String },
      client_Contact: { type: Number },
    },
    lead_Organization: {
      type: String,
    },
    lead_Title: {
      type: String,
    },
    lead_Value: {
      type: Number,
    },
    lead_Label: {
      type: String,
      enum: ["Hot", "Warm", "Cold"],
    },
    lead_Source: {
      type: String,
      enum: [
        "Prospector",
        "Lead Suggestions",
        "Web Forms",
        "Chatbot",
        "Live Chat",
        "Web Visitors",
        "Campaigns",
        "Marketplace",
        "Messaging Inbox",
        "None",
      ],
    },
    lead_Status: {
      type: String,
      enum: ["Prospect", "Qualified", "Close-Won"],
      default: "Prospect",
    },
    // Lead score calcualted by the following attributes -- START
    lead_Score: {
      type: Number,
      default: 0,
    },
    lead_Demography: {
      company_Size: {
        type: Number,
        default: 1,
      },
      industry_Match: {
        type: Boolean,
        default: false,
      },
      location: {
        type: String,
        default: "None",
      },
      job_Title: {
        type: String,
        default: "None",
      },
      misaligned_Demographics: {
        type: Boolean,
        default: false,
      },
    },
    lead_Behaviour: {
      visited_Pricing_Page: {
        type: Number,
        default: 0,
      },
      downloaded_White_Paper: {
        type: Boolean,
        default: false,
      },
      repeated_Website_Visits: {
        type: Boolean,
        default: false,
      },
      ignore_Email_or_Unsubscribed: {
        type: Boolean,
        default: false,
      },
    },
    lead_Action: {
      requested_Demo_or_Quote: {
        type: Boolean,
        default: false,
      },
      attended_Sales_Call: {
        type: Boolean,
        default: false,
      },
      opted_for_Trial_Services: {
        type: Boolean,
        default: false,
      },
    },
    lead_AttributesOrAction: {
      invalid_Email_or_ContactInfo: {
        type: Boolean,
        default: false,
      },
      competitor: {
        type: Boolean,
        default: false,
      },
      budget_Below_Threshold: {
        type: Boolean,
        default: false,
      },
    },
    lead_Notes: [
      {
        note: { type: String },
        note_CreatedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    lead_Pipeline: [
      {
        stage_Name: { type: String },
        stage_Detail: { type: String },
        stage_CreatedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Lead = mongoose.model("Lead", leadSchema);
module.exports = Lead;
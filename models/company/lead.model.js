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
    },
    // Lead score calcualted by the following attributes -- START
    lead_Score: {
      type: Number,
    },
    lead_Demography: {
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
      },
    },
    lead_Behaviour: {
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
    lead_Action: {
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
    lead_AttributesOrAction: {
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
          }
        },
      ],
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Lead = mongoose.model("Lead", leadSchema);
module.exports = Lead;

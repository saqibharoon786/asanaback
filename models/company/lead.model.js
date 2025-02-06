const mongoose = require("mongoose");
const schedule = require("node-schedule");

// Lead schema
const leadSchema = new mongoose.Schema(
  {
    companyId: { type: String },
    leadIdentifier: { type: String },
    lead_TransferAndAssign: [
      {
        lead_TransferredByUserId: {
          type: String,
        },
        lead_AssignedToUserId: {
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
    lead_Type: {
      type: String,
      enum: [
        "business",
        "individual",
      ],
    },
    lead_Customer: {
      customer_Name: {
        type: String,
      },
      customer_Email: {
        type: String,
      },
      customer_Contact: {
        type: String,
      },
      customer_Address: {
        type: String,
      },
    },
    lead_ContactPerson: {
      contactPerson_Name: {
        type: String,
      },
      contactPerson_Email: {
        type: String,
      },
      contactPerson_Contact: {
        type: String,
      },
    },
    lead_Title: {
      type: String,
    },
    lead_Label: {
      type: String,
      enum: ["Hot", "Warm", "Cold"],
    },
    lead_Source: {
      type: String,
      enum: [
        "Whatsapp",
        "Emails",
        "Calls",
        "Website Forms",
        "References",
        "Social Media",
      ],
    },
    lead_Scope: {
      type: String,
    },
    lead_Status: {
      type: String,
      enum: ["Pending", "Approved"
      ],
      default: "Pending",
    },
    
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
    lead_InteractionHistory: [
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

schedule.scheduleJob("0 0 * * *", async () => {
  try {
    const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000); // 2 days ago
    const sixDaysAgo = new Date(Date.now() - 6 * 24 * 60 * 60 * 1000); // 6 days ago

    // Update leads older than 2 days but less than 6 days to "Warm"
    await Lead.updateMany(
      {
        createdAt: { $lte: twoDaysAgo, $gt: sixDaysAgo },
        lead_Label: { $ne: "Warm" }, // Only update if not already Warm
      },
      { $set: { lead_Label: "Warm" } }
    );

    // Update leads older than 6 days to "Cold"
    await Lead.updateMany(
      {
        createdAt: { $lte: sixDaysAgo },
        lead_Label: { $ne: "Cold" }, 
      },
      { $set: { lead_Label: "Cold" } }
    );

    console.log("Lead labels updated based on age.");
  } catch (error) {
    console.error("Error updating lead labels:", error);
  }
});

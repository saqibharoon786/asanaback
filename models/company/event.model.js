const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    companyId: { type: String },
    userId: { type: String },
    event_Title: {
      type: String,
    },
    start_Time: {
      type: Date,
      default: Date.now,
    },
    end_Time: {
      type: Date,
    },
    event_Description: {
      type: String,
    },
    deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;

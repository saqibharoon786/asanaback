const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    companyId: { type: String },
    event_Name: { type: String },
    event_Description: { type: String },
    event_organizer: { type: String },
    event_location: { type: String },
    event_Date: { type: Date },
    event_Image: { filePath: { type: String } },
    deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;

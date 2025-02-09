// models/Notification.js
const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    companyId: { type: String, required: true },
    sender:{type:String},
    recipients: [{ type: String, required: true }], 
    event_Title: { type: String, required: true },
    // The time when the notification should appear.
    notification_Time: { type: Date, required: true },
    event_Description: { type: String },
    // Indicates whether the notification has been read/seen.
    event_Read: { type: Boolean, default: false },
    deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;

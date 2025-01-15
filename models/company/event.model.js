const mongoose = require("mongoose");
const moment = require("moment-timezone");

const eventSchema = new mongoose.Schema(
  {
    companyId: { type: String },
    userId: { type: String },
    event_Title: { type: String },
    start_Time: { 
      type: String,
      default: () => moment().tz("Asia/Karachi").format(),
    },
    end_Time: { type: String },
    event_Description: { type: String },
    deleted: { type: Boolean, default: false },
    marked_As_Read: { type: Boolean, default: false }, 
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;

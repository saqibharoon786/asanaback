const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema(
  {
    package_Name: {
      type: String,
      default: "free",
    },
    package_Description: { type: String },
    package_Price: { type: Number },
    package_Services: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

const Package = mongoose.model("Package", packageSchema);
module.exports = Package;

const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    companyId: { type: String },
    company_Name: { type: String },
    company_Email: { type: String },
    company_Address: { type: String },
    company_Image: { filePath: { type: String } },
    package_Type: {
      package_Name: { type: String },
    },
    deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Company = mongoose.model("Company", companySchema);
module.exports = Company;

const companyModel = require("../models/company/companyIndex.model");

async function generateLeadId() {
  try {
    const numberOfLeads = await companyModel.Lead.countDocuments();
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    const leadId = `${numberOfLeads + 1}-${day}-${month}-${year}`;
    return leadId;
  } catch (error) {
    console.error("Error generating Lead ID:", error);
  }
}

module.exports = generateLeadId;

const companyModel = require("../models/company/companyIndex.model"); // Adjust the path to your Company model

async function generateUniqueCompanyId(companyName) {
  try {
    const count = await companyModel.Company.countDocuments();
    const namePrefix = companyName.substring(0, 2).toUpperCase(); // Take the first 2 letters of the company name and convert to uppercase

    const companyId = `${namePrefix}-${count + 1}`;
    return companyId;
  } catch (error) {
    console.error("Error generating unique company ID:", error);
    throw new Error("Unable to generate a unique company ID.");
  }
}

module.exports = generateUniqueCompanyId;

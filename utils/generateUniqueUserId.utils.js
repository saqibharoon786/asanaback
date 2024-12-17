const companyModel = require("../models/company/companyIndex.model");  // Adjust the path to your Company model

// Function to generate a unique ID based on the name
async function generateUniqueUserId(name) {
  try {    
    const count = await companyModel.User.countDocuments();
    const namePrefix = name.substring(0, 2).toUpperCase();
    // Generate the unique ID by concatenating namePrefix with count + 1
    const userId = `${namePrefix}-${count + 1}`;
    return userId;
  } catch (error) {
    console.error("Error generating unique ID:", error);
    throw new Error("Unable to generate a unique ID.");
  }
}

module.exports = generateUniqueUserId;

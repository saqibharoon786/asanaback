const companyModel = require("../models/company/companyIndex.model");

async function generateQuoteId() {
  try {
    const numberOfQuote = await companyModel.Quote.countDocuments();
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    const QuoteId = `${numberOfQuote + 1}-${day}-${month}-${year}`;
    return QuoteId;
  } catch (error) {
    console.error("Error generating Quote ID:", error);
  }
}

module.exports = generateQuoteId;

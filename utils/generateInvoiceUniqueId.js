const companyModel = require("../models/company/companyIndex.model");

async function generateInvoiceId() {
  try {
    const numberOfInvoice = await companyModel.Invoice.countDocuments();
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    const InvoiceId = `${numberOfInvoice + 1}-${day}-${month}-${year}`;
    return InvoiceId;
  } catch (error) {
    console.error("Error generating invoice ID:", error);
  }
}

module.exports = generateInvoiceId;

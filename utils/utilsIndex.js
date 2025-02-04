const generateUniqueUserId = require("./generateUniqueUserId.utils");
const generateUniqueCompanyId = require("./generateUniqueCompanyId");
const generateUniqueLeadId = require("./generateUniqueLeadId");
const generateUniqueQuoteId = require("./generateQuoteUniqueId");
const generateUniqueInvoiceId = require("./generateInvoiceUniqueId");

const utils = {
  generateUniqueUserId,
  generateUniqueCompanyId,
  generateUniqueLeadId,
  generateUniqueQuoteId,
  generateUniqueInvoiceId,

};

module.exports = utils;

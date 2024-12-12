const User = require("./user.model");
const Department = require("./department.model");
const Project = require("./project.model");
const Product = require("./product.model");
const Quote = require("./quote.model");
const Lead = require("./lead.model");
const Invoice = require("./invoice.model");

const companyModel = {
  User,
  Department,
  Project,
  Product,
  Quote,
  Lead,
  Invoice
};

module.exports = companyModel;

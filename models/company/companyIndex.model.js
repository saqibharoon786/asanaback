const User = require("./user.model");
const Department = require("./department.model");
const Project = require("./project.model");
const Product = require("./product.model");
const Quote = require("./quote.model");
const Lead = require("./lead.model");
const Invoice = require("./invoice.model");
const Package = require("./package.model")
const Company = require("./company.model")
const Event = require("./event.model")
const Customer = require("./customer.model")
const Notification=require("./notification.model")
const File=require("./file.model")
const Task=require("./task.model")
const Note=require("./note.model")


const companyModel = {
  User,
  Department,
  Project,
  Product,
  Quote,
  Lead,
  Invoice,
  Package,
  Company,
  Event,
  Project,
  Customer,
  Notification,
  File,
  Task,
  Note
};

module.exports = companyModel;

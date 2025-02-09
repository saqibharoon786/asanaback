var loggingIn = require("./login.controller");
var signUp = require("./signup.controller");
var companyController = require("./superAdmin/companyIndex.controller");
var department = require("./department.controller");
var project = require("./project.controller");
var product = require("./product.controller");
var quote = require("./quote.controller");
var lead = require("./lead.controller");
var invoice = require("./invoice.controller");
var event = require("./event.controller");
var customer = require("./customer.controller");
var notification=require("./notification.controller")

var controller = {
  loggingIn,
  signUp,
  companyController,
  department,
  project,
  product,
  quote,
  lead,
  invoice,
  event,
  customer,
  notification
};

module.exports = controller;

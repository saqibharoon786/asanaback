var loggingIn = require("./login.controller");
var signUp = require("./signup.controller");
var department = require("./department.controller");
var project = require("./project.controller");
var product = require("./product.controller");
var quote = require("./quote.controller");
var lead = require("./lead.controller");
var invoice = require("./invoice.controller");

var controller = {
  loggingIn,
  signUp,
  department,
  project,
  product,
  quote,
  lead,
  invoice,
};

module.exports = controller;

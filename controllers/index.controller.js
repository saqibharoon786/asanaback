var loggingIn = require("./login.controller");
var signUp = require("./signup.controller");
var department = require("./department.controller");
var project = require("./project.controller");
var product = require("./product.controller");
var quote = require("./quote.controller");

var controller = {
  loggingIn,
  signUp,
  department,
  project,
  product,
  quote,
};

module.exports = controller;

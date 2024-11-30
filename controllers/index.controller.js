var loggingIn = require("./login.controller");
var signUp = require("./signup.controller");
var admin = require("./admin.controller");
var project = require("./project.controller");

var controller = {
  loggingIn,
  signUp,
  admin,
  project,
};

module.exports = controller;

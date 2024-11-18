var loggingIn = require("./login.controller");
var signup = require("./signup.controller");
var user = require("./user.controller");
var admin = require("./admin.controller");
var moderator = require("./moderator.controller");

var controller = {
  loggingIn,
  signup,
  user,
  admin,
  moderator,
};

module.exports = controller;

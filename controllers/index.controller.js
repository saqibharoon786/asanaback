var loggingIn = require("./login.controller");
var signUp = require("./signup.controller");
var adminController = require("./admin/adminIndex.controller");
var hrController = require("./hr/hrIndex.controller");
var salesController = require("./sales/salesIndex.controller");

var controller = {
  loggingIn,
  signUp,
  adminController,
  hrController,
  salesController
};

module.exports = controller;

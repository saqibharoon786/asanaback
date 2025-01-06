var department = require ("./department.controller");
var event = require ("./event.controller");
var project = require ("./project.controller");

var hrController = {
  department,
  event,
  project
};

module.exports = hrController;

var department = require ("./department.controller");
var event = require ("./event.controller");

var hrController = {
  department,
  event
};

module.exports = hrController;

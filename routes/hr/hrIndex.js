var express = require("express");
var hrRouter = express.Router();
const department = require("./department.route");
const event = require("./event.route");
const project = require("./project.route");

hrRouter.use("/department", department);
hrRouter.use("/event", event);
hrRouter.use("/project", project);

module.exports = hrRouter;

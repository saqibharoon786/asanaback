var express = require("express");
var hrRouter = express.Router();
const department = require("./department.route");
// const project = require("./project.route");

hrRouter.use("/department", department);
// hrRouter.use("/project", project);

module.exports = hrRouter;

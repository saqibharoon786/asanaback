var express = require("express");
var hrRouter = express.Router();
const department = require("./department.route");
const event = require("./event.route");

hrRouter.use("/department", department);
hrRouter.use("/event", event);

module.exports = hrRouter;

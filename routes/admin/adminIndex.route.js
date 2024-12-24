var express = require("express");
var adminRouter = express.Router();
const department = require("./department.route");
const product = require("./product.route");
const lead = require("./lead.route");
const quote = require("./quote.route");
const invoice  = require("./invoice.route");
// const project = require("./project.route");

adminRouter.use("/department", department);
adminRouter.use("/product", product);
adminRouter.use("/lead", lead);
adminRouter.use("/quote", quote);
adminRouter.use("/invoice", invoice);
// adminRouter.use("/project", project);

module.exports = adminRouter;

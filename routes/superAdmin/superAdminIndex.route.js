var express = require("express");
var superAdminRouter = express.Router();
const package = require("./package.route");
const company = require("./company.route");
// const lead = require("./lead.route");
// const invoice  = require("./invoice.route");

superAdminRouter.use("/package", package);
superAdminRouter.use("/company", company);
// superAdminRouter.use("/lead", lead);
// superAdminRouter.use("/invoice", invoice);

module.exports = superAdminRouter;

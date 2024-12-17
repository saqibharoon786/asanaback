var express = require("express");
var adminRouter = express.Router();
const department = require("./department.route");
// const project = require("./project.route");
// const product = require("./product.route");
// const quote = require("./quote.route");
// const lead = require("./lead.route");
// const invoice  = require("./invoice.route");

adminRouter.use("/department", department);
// adminRouter.use("/project", project);
// adminRouter.use("/product", product);
// adminRouter.use("/quote", quote);
// adminRouter.use("/lead", lead);
// adminRouter.use("/invoice", invoice);

module.exports = adminRouter;

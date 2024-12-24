var express = require("express");
var salesRouter = express.Router();
const product = require("./product.route");
const quote = require ("./quote.route");
const lead = require("./lead.route");
const invoice  = require("./invoice.route");


salesRouter.use("/product", product);
salesRouter.use("/quote", quote);
salesRouter.use("/lead", lead);
salesRouter.use("/invoice", invoice);

module.exports = salesRouter;

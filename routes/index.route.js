var express = require("express");
var router = express.Router();
const login = require("./login.route");
const signup = require("./signup.route");
const department = require("./department.route");
const project = require("./project.route");
const product = require("./product.route");
const quote = require("./quote.route");
const lead = require("./lead.route");

// router.use("/", (req, res) => {
//   res.send("HOME");
// });
router.use("/login", login);
router.use("/signup", signup);
router.use("/department", department);
router.use("/project", project);
router.use("/product", product);
router.use("/quote", quote);
router.use("/lead", lead);

module.exports = router;

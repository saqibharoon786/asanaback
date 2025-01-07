var express = require("express");
var router = express.Router();

const superadmin = require("./superAdmin/superAdminIndex.route");

const login = require("./login.route");
const signup = require("./signup.route");

const department = require("./department.route");
const product = require("./product.route");
const lead = require("./lead.route");
const quote = require("./quote.route");
const invoice  = require("./invoice.route");

// router.use("/", (req, res) => {
//   res.send("HOME");
// });

router.use("/superadmin", superadmin);

router.use("/login", login);
router.use("/signup", signup);

router.use("/department", department);
router.use("/product", product);
router.use("/lead", lead);
router.use("/quote", quote);
router.use("/invoice", invoice);

module.exports = router;

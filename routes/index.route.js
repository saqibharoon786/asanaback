var express = require("express");
var router = express.Router();
const login = require("./login.route");
const signup = require("./signup.route");
const admin = require("./admin/adminIndex.route");
const hr = require("./hr/hrIndex");
const sales = require("./sales/salesIndex.route");
const superadmin = require("./superAdmin/superAdminIndex.route");

// router.use("/", (req, res) => {
//   res.send("HOME");
// });
router.use("/login", login);
router.use("/signup", signup);
router.use("/admin", admin);
router.use("/sales", sales);
router.use("/hr", hr);
router.use("/superadmin", superadmin);

module.exports = router;

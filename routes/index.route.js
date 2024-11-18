var express = require("express");
var router = express.Router();
const login = require("./login.route");
const signup = require("./signup.route");
const user = require("./user.route");
const admin = require("./admin.route");

// router.use("/", (req, res) => {
//   res.send("HOME");
// });
router.use("/login", login);
router.use("/signup", signup);
router.use("/user", user);
router.use("/admin", admin);

module.exports = router;

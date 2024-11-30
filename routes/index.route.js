var express = require("express");
var router = express.Router();
const login = require("./login.route");
const signup = require("./signup.route");
const admin = require("./admin.route");
const project = require("./project.route");

// router.use("/", (req, res) => {
//   res.send("HOME");
// });
router.use("/login", login);
router.use("/signup", signup);
router.use("/admin", admin);
router.use("/project", project);

module.exports = router;

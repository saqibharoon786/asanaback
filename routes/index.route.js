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
const event  = require("./event.route");
const customer  = require("./customer.route");
const notifcation=require("./notification.route")
const project=require('./project.route')
const task=require('./task.route')
const goal=require('./goal.route')

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
router.use("/event", event);
router.use("/customer", customer);
router.use("/notification", notifcation)
router.use("/project",project)
router.use("/task",task)
router.use("/goal",goal)

module.exports = router;

const express = require("express");
const router = express.Router();
const controller = require("../controllers/index.controller");
const passport = require("../middleware/passportAuth.middleware");
const middleware = require("../middleware/index.middleware");

// Admin routes
router.get(
  "/all-leads",
  passport.authenticate("jwt", { session: false }),
  middleware.adminRoleCheck,
  controller.lead.getAllLeads
);

router.post(
  "/create-lead",
  // passport.authenticate("jwt", { session: false }),
  // middleware.adminRoleCheck,
  controller.lead.createLead
);

module.exports = router;
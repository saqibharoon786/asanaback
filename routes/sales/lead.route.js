const express = require("express");
const router = express.Router();
const controller = require("../../controllers/index.controller");
const passport = require("../../middleware/passportAuth.middleware");
const middleware = require("../../middleware/index.middleware");

// Admin routes
router.get(
  "/all-leads",
  passport.authenticate("jwt", { session: false }),
  middleware.salesRoleCheck,
  controller.salesController.lead.getAllLeads
);

router.post(
  "/create-lead",
  passport.authenticate("jwt", { session: false }),
  middleware.salesRoleCheck,
  controller.salesController.lead.createLead
);

router.get(
  '/:leadId',
  passport.authenticate('jwt', { session: false }),
  middleware.salesRoleCheck,
  controller.salesController.lead.getLeadById
)

router.patch(
  "/approve/:leadId",
  passport.authenticate("jwt", { session: false }),
  middleware.salesRoleCheck,
  controller.salesController.lead.approveLeadById
);

router.delete(
  "/delete/:leadId",
  passport.authenticate("jwt", { session: false }),
  middleware.salesRoleCheck,
  controller.salesController.lead.deleteLead,
);

module.exports = router;
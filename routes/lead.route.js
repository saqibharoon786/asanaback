const express = require("express");
const router = express.Router();
const controller = require("../controllers/index.controller");
const upload = require("../config/multer");
const passport = require("../middleware/passportAuth.middleware");
const middleware = require("../middleware/index.middleware");

router.post(
  "/create-lead",
  passport.authenticate("jwt", { session: false }),
  middleware.checkPermission("create"), 
  controller.lead.createLead
);

router.patch(
  "/update/:leadId",
  passport.authenticate("jwt", { session: false }),
  middleware.checkPermission("update"), 
  controller.lead.addOptionalDataToLead
);

router.get(
  "/all-leads",
  passport.authenticate("jwt", { session: false }),
  middleware.checkPermission("read"), 
  controller.lead.getAllLeads
);

router.get(
  '/:leadId',
  passport.authenticate('jwt', { session: false }),
  middleware.checkPermission("read"), 
  controller.lead.getLeadById
)

router.patch(
  "/approve/:leadId",
  passport.authenticate("jwt", { session: false }),
  middleware.checkPermission("update"), 
  controller.lead.approveLeadById
);

router.delete(
  "/delete/:leadId",
  passport.authenticate("jwt", { session: false }),
  middleware.checkPermission("delete"), 
  controller.lead.deleteLead,
);

module.exports = router;
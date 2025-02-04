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
  "/all-sales-employee-leads",
  passport.authenticate("jwt", { session: false }),
  middleware.checkPermission("read"),
  controller.lead.getSalesEmployeeLeads
);

router.get(
  "/:leadId",
  passport.authenticate("jwt", { session: false }),
  middleware.checkPermission("read"),
  controller.lead.getLeadById
);

router.patch(
  "/approve/:leadId",
  passport.authenticate("jwt", { session: false }),
  middleware.checkPermission("update"),
  controller.lead.approveLeadById
);

router.post(
  "/add-note/:leadId",
  passport.authenticate("jwt", { session: false }),
  middleware.checkPermission("delete"),
  controller.lead.addNote
);

router.post(
  "/add-interaction-history/:leadId",
  passport.authenticate("jwt", { session: false }),
  middleware.checkPermission("delete"),
  controller.lead.addInteractionHistoryDetail
);

router.patch(
  "/transfer-lead/:leadId",
  passport.authenticate("jwt", { session: false }),
  middleware.checkPermission("update"),
  controller.lead.leadTransferred
);

router.post(
  "/mass-transfer",
  passport.authenticate("jwt", { session: false }),
  middleware.checkPermission("update"),
  controller.lead.massTransferLeads
);

router.patch(
  "/convert-to-quote/:leadId",
  passport.authenticate("jwt", { session: false }),
  middleware.checkPermission("update"),
  controller.lead.leadTransferred
);

router.delete(
  "/delete/:leadId",
  passport.authenticate("jwt", { session: false }),
  middleware.checkPermission("delete"),
  controller.lead.deleteLead
);

router.post(
  "/mass-delete",
  passport.authenticate("jwt", { session: false }),
  middleware.checkPermission("delete"),
  controller.lead.massDeleteLeads
);

router.patch(
  "/approve-lead/:leadId",
  passport.authenticate("jwt", { session: false }),
  middleware.checkPermission("update"),
  controller.lead.approveLeadById
);

module.exports = router;

const express = require("express");
const router = express.Router();
const controller = require("../../controllers/index.controller");
const upload = require("../../config/multer");
const passport = require("../../middleware/passportAuth.middleware");
const middleware = require("../../middleware/index.middleware");

// //
// router.get(
//   "/view-lead",
//   passport.authenticate("jwt", { session: false }),
//   middleware.checkPermission("read"), 
//   (req, res) => {
//     res.send("Leads Data");
//   }
// );

router.post(
  "/create-lead",
  passport.authenticate("jwt", { session: false }),
  middleware.checkPermission("create"), 
  controller.adminController.lead.createLead
);

router.get(
  "/all-leads",
  passport.authenticate("jwt", { session: false }),
  middleware.checkPermission("read"), 
  controller.adminController.lead.getAllLeads
);

router.get(
  '/:leadId',
  passport.authenticate('jwt', { session: false }),
  middleware.checkPermission("read"), 
  controller.adminController.lead.getLeadById
)

router.patch(
  "/approve/:leadId",
  passport.authenticate("jwt", { session: false }),
  middleware.checkPermission("update"), 
  controller.adminController.lead.approveLeadById
);

router.delete(
  "/delete/:leadId",
  passport.authenticate("jwt", { session: false }),
  middleware.checkPermission("delete"), 
  controller.adminController.lead.deleteLead,
);

module.exports = router;
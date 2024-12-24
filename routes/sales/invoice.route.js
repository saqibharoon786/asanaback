const express = require("express");
const router = express.Router();
const controller = require("../../controllers/index.controller");
const passport = require("../../middleware/passportAuth.middleware");
const middleware = require("../../middleware/index.middleware");

router.post(
  "/create-invoice",
  passport.authenticate("jwt", { session: false }),
  middleware.salesRoleCheck,
  controller.adminController.invoice.createInvoice
);

router.get(
  "/get-invoices",
  passport.authenticate("jwt", { session: false }),
  middleware.salesRoleCheck,
  controller.salesController.invoice.getAllInvoices 
);

router.patch(
  "/set-paid/:invoiceId",
  passport.authenticate("jwt", { session: false }),
  middleware.salesRoleCheck,
  controller.adminController.invoice.setPaidInvoicebyId
);

router.get(
  "/:invoiceId", 
  passport.authenticate("jwt", { session: false }), 
  middleware.salesRoleCheck, 
  controller.salesController.invoice.getInvoiceById 
);


router.delete(
  "/delete/:invoiceId",
  passport.authenticate("jwt", { session: false }),
  middleware.salesRoleCheck,
  controller.adminController.invoice.deleteInvoice,
);

module.exports = router;

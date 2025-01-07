const express = require("express");
const router = express.Router();
const controller = require("../controllers/index.controller");
const upload = require("../config/multer");
const passport = require("../middleware/passportAuth.middleware");
const middleware = require("../middleware/index.middleware");

router.post(
  "/create-invoice",
  passport.authenticate("jwt", { session: false }),
  middleware.checkPermission("create"),
  controller.invoice.createInvoice
);

router.get(
  "/get-invoices",
  passport.authenticate("jwt", { session: false }),
  middleware.checkPermission("read"),
  controller.invoice.getAllInvoices
);

router.get(
  "/:invoiceId",
  passport.authenticate("jwt", { session: false }),
  middleware.checkPermission("read"),
  controller.invoice.getInvoiceById
);

router.patch(
  "/set-paid/:invoiceId",
  passport.authenticate("jwt", { session: false }),
  middleware.checkPermission("update"),
  controller.invoice.setPaidInvoicebyId
);

router.delete(
  "/delete/:invoiceId",
  passport.authenticate("jwt", { session: false }),
  middleware.checkPermission("delete"),
  controller.invoice.deleteInvoice
);

module.exports = router;

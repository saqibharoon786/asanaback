// const express = require("express");
// const router = express.Router();
// const controller = require("../../controllers/index.controller");
// const passport = require("../../middleware/passportAuth.middleware");
// const middleware = require("../../middleware/index.middleware");

// // Admin routes
// router.post(
//   "/create-invoice",
//   // passport.authenticate("jwt", { session: false }),
//   // middleware.adminRoleCheck,
//   controller.invoice.createInvoice
// );

// router.get(
//   "/get-invoices",
//   // passport.authenticate("jwt", { session: false }),
//   // middleware.adminRoleCheck,
//   controller.invoice. getAllInvoice
// );
// router.get(
//   "/:invoiceId", 
//   // passport.authenticate("jwt", { session: false }), 
//   // middleware.adminRoleCheck, 
//   controller.invoice.getInvoiceById 
// );

// // ---------------------------User--------------------
// router.get(
//   "/user/get-invoices-by-email",
//   // passport.authenticate("jwt", { session: false }),
//   // middleware.userRoleCheck,
//   controller.invoice.getInvoiceByEmail

// );

// router.post(
//   "/user/create-invoice",
//   // passport.authenticate("jwt", { session: false }),
//   // middleware.userRoleCheck  ,   
//   controller.invoice.createInvoice
// );

// module.exports = router;

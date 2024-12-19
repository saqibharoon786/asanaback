const express = require("express");
const router = express.Router();
const controller = require("../../controllers/index.controller");
const passport = require("../../middleware/passportAuth.middleware");
const middleware = require("../../middleware/index.middleware");

// Admin routes
router.post(
  "/create-quote",
  passport.authenticate("jwt", { session: false }),
  middleware.salesRoleCheck,
  controller.salesController.quote.createQuote
);

router.get(
  "/get-quotes",
  passport.authenticate("jwt", { session: false }),
  middleware.salesRoleCheck,
  controller.salesController.quote.getAllQuotes
);

// router.get(
//   "/:quoteId",
//   // passport.authenticate("jwt", { session: false }),
//   // middleware.salesRoleCheck,
//   controller.quote.getQuoteById
// );

// router.patch(
//   "/accept/:quoteId",
//   // passport.authenticate("jwt", { session: false }),
//   // middleware.salesRoleCheck,
//   controller.quote.acceptQuoteById
// );

// router.delete(
//   "/delete/:quoteId",
//   // passport.authenticate("jwt", { session: false }),
//   // middleware.salesRoleCheck,
//   controller.quote.deleteQuote,
// );

// //User Routes

// router.post(
//   "/user/create-quote",
//   passport.authenticate("jwt", { session: false }),
//   middleware.userRoleCheck,
//   controller.quote.createQuote
// );

// router.get(
//   "/user/get-quotes-by-email",
//   passport.authenticate("jwt", { session: false }),
//   middleware.userRoleCheck,
//   controller.quote.getQuoteByEmail
// );

// router.get(
//   "/user/:quoteId",
//   passport.authenticate("jwt", { session: false }),
//   middleware.userRoleCheck,
//   controller.quote.getQuoteById
// );

module.exports = router;

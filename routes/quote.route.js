const express = require("express");
const router = express.Router();
const controller = require("../controllers/index.controller");
const passport = require("../middleware/passportAuth.middleware");
const middleware = require("../middleware/index.middleware");

// Admin routes
router.post(
  "/create-quote",
  passport.authenticate("jwt", { session: false }),
  middleware.adminRoleCheck,
  controller.quote.createQuote
);

router.get(
  "/get-quotes",
  passport.authenticate("jwt", { session: false }),
  middleware.adminRoleCheck,
  controller.quote.getAllQuotes
);
router.get(
  "getr-quote-by-id/:id",
  passport.authenticate("jwt", { session: false }),
  middleware.adminRoleCheck,
  controller.quote.getQuoteById
);

// // user route
// router.get(
//   "/get-products",
//   // passport.authenticate("jwt", { session: false }),
//   // middleware.roleUserCheck
//   controller.product.getAllProducts
// );

module.exports = router;

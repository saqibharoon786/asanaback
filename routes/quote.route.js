const express = require("express");
const router = express.Router();
const controller = require("../controllers/index.controller");
const passport = require("../middleware/passportAuth.middleware");
const middleware = require("../middleware/index.middleware");

// Admin routes
router.post(
  "/create-quote",
  // passport.authenticate("jwt", { session: false }),
  // middleware.roleAdminCheck
  controller.quote.createQuote
);

// // user route
// router.get(
//   "/get-products",
//   // passport.authenticate("jwt", { session: false }),
//   // middleware.roleUserCheck
//   controller.product.getAllProducts
// );

module.exports = router;

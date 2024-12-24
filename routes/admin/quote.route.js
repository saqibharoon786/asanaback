const express = require("express");
const router = express.Router();
const controller = require("../../controllers/index.controller");
const upload = require("../../config/multer");
const passport = require("../../middleware/passportAuth.middleware");
const middleware = require("../../middleware/index.middleware");

// Admin routes
router.post(
  "/create-quote",
  passport.authenticate("jwt", { session: false }),
  middleware.adminRoleCheck,
  controller.adminController.quote.createQuote
);

router.get(
  "/get-quotes",
  passport.authenticate("jwt", { session: false }),
  middleware.adminRoleCheck,
  controller.adminController.quote.getAllQuotes
);

router.get(
  "/:quoteId",
  passport.authenticate("jwt", { session: false }),
  middleware.adminRoleCheck,
  controller.adminController.quote.getQuoteById
);

router.patch(
  "/approve/:quoteId",
  passport.authenticate("jwt", { session: false }),
  middleware.adminRoleCheck,
  controller.adminController.quote.approveQuoteById
);

router.delete(
  "/delete/:quoteId",
  passport.authenticate("jwt", { session: false }),
  middleware.adminRoleCheck,
  controller.adminController.quote.deleteQuote
);

module.exports = router;

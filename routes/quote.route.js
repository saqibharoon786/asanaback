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
  "/:quoteId",
  passport.authenticate("jwt", { session: false }),
  middleware.adminRoleCheck,
  controller.quote.getQuoteById
);

router.patch(
  "/accept/:quoteId",
  passport.authenticate("jwt", { session: false }),
  middleware.adminRoleCheck,
  controller.quote.acceptQuoteById
);

router.patch(
  "/reject/:quoteId",
  passport.authenticate("jwt", { session: false }),
  middleware.adminRoleCheck,
  controller.quote.rejectQuoteById
);

router.delete(
  "/delete/:quoteId",
  passport.authenticate("jwt", { session: false }),
  middleware.adminRoleCheck,
  controller.quote.deleteQuote,
);



module.exports = router;

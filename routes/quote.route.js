const express = require("express");
const router = express.Router();
const controller = require("../controllers/index.controller");
const upload = require("../config/multer");
const passport = require("../middleware/passportAuth.middleware");
const middleware = require("../middleware/index.middleware");

// Admin routes
router.post(
  "/create-quote",
  passport.authenticate("jwt", { session: false }),
  middleware.checkPermission("create"),
  upload.single("quote_Image"),
  controller.quote.createQuote
);

router.patch(
  "/edit-quote/:quoteId",
  passport.authenticate("jwt", { session: false }),
  middleware.checkPermission("create"),
  upload.single("quote_Image"),
  controller.quote.EditQuote
);

router.get(
  "/get-quotes",
  passport.authenticate("jwt", { session: false }),
  middleware.checkPermission("read"),
  controller.quote.getAllQuotes
);

router.get(
  "/:quoteId",
  passport.authenticate("jwt", { session: false }),
  middleware.checkPermission("read"),
  controller.quote.getQuoteById
);

router.patch(
  "/approve/:quoteId",
  passport.authenticate("jwt", { session: false }),
  middleware.checkPermission("update"),
  controller.quote.approveQuoteById
);

router.delete(
  "/delete/:quoteId",
  passport.authenticate("jwt", { session: false }),
  middleware.checkPermission("delete"),
  controller.quote.deleteQuote
);

module.exports = router;

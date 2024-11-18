const express = require("express");
const router = express.Router();
const controller = require("../controllers/index.controller");
const passport = require("../middleware/passportAuth.middleware");
const puppeteerController = require("../controllers/puppeteer/puppeteerIndex.controller");
const middleware = require("../middleware/index.middleware");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  middleware.roleUserCheck,
  controller.user.userHome
);

router.post(
  "/new-project",
  passport.authenticate("jwt", { session: false }),
  middleware.roleUserCheck,
  puppeteerController.brokenLinks
);

router.get("/get-broken-links", puppeteerController.projectInfo);

module.exports = router;

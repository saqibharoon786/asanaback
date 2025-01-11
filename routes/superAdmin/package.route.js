const express = require("express");
const router = express.Router();
const controller = require("../../controllers/index.controller");
const passport = require("../../middleware/passportAuth.middleware");
const middleware = require("../../middleware/index.middleware");

// Admin Department routes
router.post(
  "/create-package",
  passport.authenticate("jwt", { session: false }),
  middleware.superAdminAccessCheck,
  controller.companyController.package.addPackages
);

router.get(
  "/get-packages",
  passport.authenticate("jwt", { session: false }),
  middleware.superAdminAccessCheck,
  controller.companyController.package.getPackages
);

module.exports = router;

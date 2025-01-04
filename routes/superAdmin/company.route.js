const express = require("express");
const router = express.Router();
const controller = require("../../controllers/index.controller");
const upload = require("../../config/multer");
const passport = require("../../middleware/passportAuth.middleware");
const middleware = require("../../middleware/index.middleware");

router.post(
  "/add-company",
  passport.authenticate("jwt", { session: false }),
  middleware.superAdminAccessCheck,
  upload.single("company_Image"),
  controller.companyController.company.addCompany
);

router.post(
  "/:companyId/add-admin",
  passport.authenticate("jwt", { session: false }),
  middleware.superAdminAccessCheck,
  upload.single("admin_Image"),
  controller.companyController.company.addAdminToCompany
);


module.exports = router;

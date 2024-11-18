const express = require("express");
const router = express.Router();
const controller = require("../controllers/index.controller");
const passport = require("../middleware/passportAuth.middleware");
const middleware = require("../middleware/index.middleware");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  middleware.roleAdminCheck,
  controller.admin.adminHome
);

module.exports = router;

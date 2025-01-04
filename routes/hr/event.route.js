const express = require("express");
const router = express.Router();
const controller = require("../../controllers/index.controller");
const upload = require("../../config/multer");
const passport = require("../../middleware/passportAuth.middleware");
const middleware = require("../../middleware/index.middleware");

// Admin Department routes
router.post(
  "/add-event",
  passport.authenticate("jwt", { session: false }),
  middleware.hrRoleCheck,
  controller.hrController.event.addEvent
);

module.exports = router;

const express = require("express");
const passport = require("passport");
const router = express.Router();
const controller = require("../controllers/index.controller");

// Protect routes with Passport JWT middleware
router.post(
  "/create-task/:projectId",
  passport.authenticate("jwt", { session: false }),
  controller.task.createTask
);

router.get(
  "/getAllTaskByProjectId/:projectId", // Change projectid to projectId
  passport.authenticate("jwt", { session: false }),
  controller.task.getAllTaskByProjectId
);

router.patch(
  "/updateTask/:_id", // ✅ Correctly formatted route
  passport.authenticate("jwt", { session: false }),
  controller.task.updateTask
);

module.exports = router;

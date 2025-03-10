const express = require("express");
const router = express.Router();
const controller = require("../controllers/index.controller");
const passport = require("../middleware/passportAuth.middleware");

router.post(
  "/create-goal",
  passport.authenticate("jwt", { session: false }),
  controller.goal.creategoal
);
router.get(
  "/get-all-goals",
  passport.authenticate("jwt", { session: false }),
  controller.goal.getallgoals
);
router.get(
  "/getbyid/:id",
  passport.authenticate("jwt", { session: false }),
  controller.goal.getGoalsById
);

router.patch(
  "/updateGoalStatus/:_id", // ✅ Correctly formatted route
  passport.authenticate("jwt", { session: false }),
  controller.goal.updateGoalStatus
);

module.exports = router;

const express = require("express");
const router = express.Router();
const controller = require("../controllers/index.controller");

router.post(
  "/add-project",
  // passport.authenticate("jwt", { session: false }),
  // middleware.roleAdminCheck
  controller.project.addProject
);

router.patch(
  "/add-employee-to-project",
  // passport.authenticate("jwt", { session: false }),
  // middleware.roleAdminCheck
  controller.project.addProjectEmployee
);
router.get(
  "/get-projects",
  // passport.authenticate("jwt", { session: false }),
  // middleware.roleAdminCheck
  controller.project.getAllProjects
);

module.exports = router;

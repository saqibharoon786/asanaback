const express = require("express");
const router = express.Router();
const controller = require("../../controllers/index.controller");
const passport = require("../../middleware/passportAuth.middleware");
const middleware = require("../../middleware/index.middleware");

  router.post(
  "/add-project",
  // passport.authenticate("jwt", { session: false }),
  // middleware.adminRoleCheck,
  controller.hrController.project.addProject
);

router.get(
  "/get-projects",
  // passport.authenticate("jwt", { session: false }),
  // middleware.adminRoleCheck,
  controller.hrController.project.getAllProjects
);


router.patch(
  "/add-employee-to-project",
  // passport.authenticate("jwt", { session: false }),
  // middleware.adminRoleCheck,
  controller.hrController.project.addProjectEmployee
);


module.exports = router;

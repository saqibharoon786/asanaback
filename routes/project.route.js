const express = require("express");
const router = express.Router();
const controller = require("../controllers/index.controller");
const passport = require("../middleware/passportAuth.middleware");
const middleware = require("../middleware/index.middleware");

//--------------------------------- admin Routes --------------------
router.get(
  "/admin/projects",
  // passport.authenticate("jwt", { session: false }),
  // middleware.roleAdminCheck
  controller.project.getAllProjects
);

router.post(
  "/admin/add-project",
  // passport.authenticate("jwt", { session: false }),
  // middleware.roleAdminCheck
  controller.project.addProject
);

router.patch(
  "/admin/add-employee-to-project",
  // passport.authenticate("jwt", { session: false }),
  // middleware.roleAdminCheck
  controller.project.addProjectEmployee
);

//--------------------------------- User Routes --------------------
router.get(
  "/user/projects",
  passport.authenticate("jwt", { session: false }),
  middleware.userRoleCheck,
  controller.project.getUserProjects
);

module.exports = router;

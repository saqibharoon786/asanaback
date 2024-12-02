const express = require("express");
const router = express.Router();
const controller = require("../controllers/index.controller");
const upload = require("../config/multer");
// const passport = require("../middleware/passportAuth.middleware");
// const middleware = require("../middleware/index.middleware");

// Admin routes
router.get(
  "/"
  // passport.authenticate("jwt", { session: false }),
  // middleware.roleAdminCheck
  // controller.companyAdmin
);

router.post(
  "/add-department",
  // passport.authenticate("jwt", { session: false }),
  // middleware.roleAdminCheck
  controller.admin.addDepartment
);

router.post(
  "/add-employee",
  upload.single("employee_Image"),
  // passport.authenticate("jwt", { session: false }),
  // middleware.roleAdminCheck
  controller.admin.addEmployee
);

router.get(
  "/get-employees",
  // passport.authenticate("jwt", { session: false }),
  // middleware.roleAdminCheck
  controller.admin.getEmployees
);
router.get(
  "/get-departments",
  // passport.authenticate("jwt", { session: false }),
  // middleware.roleAdminCheck
  controller.admin.getDepartments
);

module.exports = router;

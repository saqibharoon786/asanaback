const express = require("express");
const router = express.Router();
const controller = require("../../controllers/index.controller");
const upload = require("../../config/multer");
const passport = require("../../middleware/passportAuth.middleware");
const middleware = require("../../middleware/index.middleware");

// Admin routes
router.post(
  "/add-department",
  // passport.authenticate("jwt", { session: false }),
  // middleware.adminRoleCheck,
  controller.department.addDepartment
);

router.patch(
  "/add-employee",
  upload.single("employee_Image"),
  // passport.authenticate("jwt", { session: false }),
  // middleware.adminRoleCheck,
  controller.department.addEmployeeToDepartment
);

router.delete(
  "/delete-employee",
  // passport.authenticate("jwt", { session: false }),
  // middleware.adminRoleCheck,
  controller.department.deleteEmployee
);

router.get(
  "/get-employees",
  // passport.authenticate("jwt", { session: false }),
  // middleware.adminRoleCheck,
  controller.department.getEmployees
);

router.get(
  "/get-departments",
  // passport.authenticate("jwt", { session: false }),
  // middleware.adminRoleCheck,
  controller.department.getDepartments
);

// Uer Routes
router.get(
  "/user/departments",
  // passport.authenticate("jwt", { session: false }),
  // middleware.userRoleCheck,
  controller.department.getUserDepartments
);

module.exports = router;

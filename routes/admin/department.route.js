const express = require("express");
const router = express.Router();
const controller = require("../../controllers/index.controller");
const upload = require("../../config/multer");
const passport = require("../../middleware/passportAuth.middleware");
const middleware = require("../../middleware/index.middleware");

// Admin routes
router.post(
  "/add-department",
  passport.authenticate("jwt", { session: false }),
  middleware.adminRoleCheck,
  controller.adminController.department.addDepartment
);

router.get(
  "/get-departments",
  passport.authenticate("jwt", { session: false }),
  middleware.adminRoleCheck,
  controller.adminController.department.getDepartments
);

router.patch(
  "/add-employee",
  passport.authenticate("jwt", { session: false }),
  middleware.adminRoleCheck,
  upload.single('employee_Image'),
  controller.adminController.department.addEmployeeToDepartment
);

router.delete(
  "/delete-employee",
  passport.authenticate("jwt", { session: false }),
  middleware.adminRoleCheck,
  controller.adminController.department.deleteEmployee
);

router.get(
  "/get-employees",
  passport.authenticate("jwt", { session: false }),
  middleware.adminRoleCheck,
  controller.adminController.department.getAllEmployees
);

router.patch(
  "/update-employee/:userId",
  passport.authenticate("jwt", { session: false }),
  middleware.adminRoleCheck,
  upload.single('employee_Image'),
  controller.adminController.department.updateEmployee
);

router.get(
  "/get-employee/:userId",
  passport.authenticate("jwt", { session: false }),
  middleware.adminRoleCheck,
  controller.adminController.department.getEmployeeInformation
);

// // Uer Routes 
// router.get(
//   "/user-department",
//   // passport.authenticate("jwt", { session: false }),
//   // middleware.userRoleCheck,
//   controller.department.getUserDepartments
// );

module.exports = router;

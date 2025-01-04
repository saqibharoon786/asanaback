const express = require("express");
const router = express.Router();
const controller = require("../../controllers/index.controller");
const passport = require("../../middleware/passportAuth.middleware");
const middleware = require("../../middleware/index.middleware");

// Admin Department routes
router.post(
  "/create-package",
  //   passport.authenticate("jwt", { session: false }),
  //   middleware.adminRoleCheck,
  controller.companyController.package.addPackages
);

// router.get(
//   "/get-departments",
//   passport.authenticate("jwt", { session: false }),
//   middleware.adminRoleCheck,
//   controller.adminController.department.getDepartments
// );

// router.patch(
//   "/add-employee",
//   passport.authenticate("jwt", { session: false }),
//   middleware.adminRoleCheck,
//   upload.single('employee_Image'),
//   controller.adminController.department.addEmployeeToDepartment
// );

// router.delete(
//   "/delete-employee",
//   passport.authenticate("jwt", { session: false }),
//   middleware.adminRoleCheck,
//   controller.adminController.department.deleteEmployee
// );

// router.get(
//   "/get-employees",
//   passport.authenticate("jwt", { session: false }),
//   middleware.adminRoleCheck,
//   controller.adminController.department.getAllEmployees
// );

// router.patch(
//   "/update-employee/:userId",
//   passport.authenticate("jwt", { session: false }),
//   middleware.adminRoleCheck,
//   upload.single('employee_Image'),
//   controller.adminController.department.updateEmployee
// );

// router.get(
//   "/get-employee/:userId",
//   passport.authenticate("jwt", { session: false }),
//   middleware.adminRoleCheck,
//   controller.adminController.department.getEmployeeInformation
// );

module.exports = router;

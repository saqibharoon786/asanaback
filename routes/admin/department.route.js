const express = require("express");
const router = express.Router();
const controller = require("../../controllers/index.controller");
const upload = require("../../config/multer");
const passport = require("../../middleware/passportAuth.middleware");
const middleware = require("../../middleware/index.middleware");

// Admin Department routes
router.post(
  "/:companyId/add-department",
  passport.authenticate("jwt", { session: false }),
  middleware.adminRoleCheck,
  controller.adminController.department.addDepartment
);

router.get(
  "/:companyId/get-departments",
  passport.authenticate("jwt", { session: false }),
  middleware.adminRoleCheck,
  controller.adminController.department.getDepartments
);

router.patch(
  "/:companyId/add-employee",
  passport.authenticate("jwt", { session: false }),
  middleware.adminRoleCheck,
  upload.single('employee_Image'),
  controller.adminController.department.addEmployeeToDepartment
);

router.delete(
  "/:companyId/delete-employee",
  passport.authenticate("jwt", { session: false }),
  middleware.adminRoleCheck,
  controller.adminController.department.deleteEmployee
);

router.get(
  "/:companyId/get-employees",
  passport.authenticate("jwt", { session: false }),
  middleware.adminRoleCheck,
  controller.adminController.department.getAllEmployees
);

router.patch(
  "/:companyId/update-employee/:userId",
  passport.authenticate("jwt", { session: false }),
  middleware.adminRoleCheck,
  upload.single('employee_Image'),
  controller.adminController.department.updateEmployee
);

router.get(
  "/:companyId/get-employee/:userId",
  passport.authenticate("jwt", { session: false }),
  middleware.adminRoleCheck,
  controller.adminController.department.getEmployeeInformation
);

module.exports = router;

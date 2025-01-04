const express = require("express");
const router = express.Router();
const controller = require("../../controllers/index.controller");
const upload = require("../../config/multer");
const passport = require("../../middleware/passportAuth.middleware");
const middleware = require("../../middleware/index.middleware");

// Admin Department routes
router.post(
  "/add-department",
  passport.authenticate("jwt", { session: false }),
  middleware.hrRoleCheck,
  controller.hrController.department.addDepartment
);

router.get(
  "/get-departments",
  passport.authenticate("jwt", { session: false }),
  middleware.salesRoleCheck,
  controller.hrController.department.getDepartments
);

router.patch(
  "/add-employee",
  passport.authenticate("jwt", { session: false }),
  middleware.salesRoleCheck,
  upload.single('employee_Image'),
  controller.hrController.department.addEmployeeToDepartment
);

router.delete(
  "/delete-employee",
  passport.authenticate("jwt", { session: false }),
  middleware.salesRoleCheck,
  controller.hrController.department.deleteEmployee
);

router.get(
  "/get-employees",
  passport.authenticate("jwt", { session: false }),
  middleware.salesRoleCheck,
  controller.hrController.department.getAllEmployees
);

router.patch(
  "/update-employee/:userId",
  passport.authenticate("jwt", { session: false }),
  middleware.salesRoleCheck,
  upload.single('employee_Image'),
  controller.hrController.department.updateEmployee
);

router.get(
  "/get-employee/:userId",
  passport.authenticate("jwt", { session: false }),
  middleware.salesRoleCheck,
  controller.hrController.department.getEmployeeInformation
);

module.exports = router;

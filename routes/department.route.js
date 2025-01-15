const express = require("express");
const router = express.Router();
const controller = require("../controllers/index.controller");
const upload = require("../config/multer");
const passport = require("../middleware/passportAuth.middleware");
const middleware = require("../middleware/index.middleware");


// router.post(
//   "/add-department",
//   passport.authenticate("jwt", { session: false }),
//   middleware.checkPermission("create"),
//   controller.department.addDepartment
// );


router.get(
  "/get-departments",
  passport.authenticate("jwt", { session: false }),
  middleware.checkPermission("read"),
  controller.department.getDepartments
);

router.patch(
  "/add-employee",
  passport.authenticate("jwt", { session: false }),
  middleware.checkPermission("update"),
  upload.single("employee_Image"),
  controller.department.addEmployeeToDepartment
);

router.delete(
  "/delete-employee",
  passport.authenticate("jwt", { session: false }),
  middleware.checkPermission("delete"),
  controller.department.deleteEmployee
);


router.get(
  "/get-employees",
  passport.authenticate("jwt", { session: false }),
  middleware.checkPermission("read"),
  controller.department.getAllEmployees
);

router.patch(
  "/update-employee/:userId",
  passport.authenticate("jwt", { session: false }),
  middleware.checkPermission("update"),
  upload.single("employee_Image"),
  controller.department.updateEmployee
);

router.get(
  "/get-employee/:userId",
  passport.authenticate("jwt", { session: false }),
  middleware.checkPermission("read"),
  controller.department.getEmployeeInformation
);

router.get(
  "/get-sales-employees",
  passport.authenticate("jwt", { session: false }),
  // middleware.checkPermission("read"),
  controller.department.getSalesEmployees
);

module.exports = router;

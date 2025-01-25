const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const controller = require("../controllers/index.controller");
const passport = require("../middleware/passportAuth.middleware");
const middleware = require("../middleware/index.middleware");

router.post(
  "/add-customer",
  passport.authenticate("jwt", { session: false }),
//   middleware.checkPermission("create"),
//   upload.single("product_Image"),
  controller.customer.createCustomer
);

module.exports = router;

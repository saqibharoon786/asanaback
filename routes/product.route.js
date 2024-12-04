const express = require("express");
const router = express.Router();
const controller = require("../controllers/index.controller");
const passport = require("../middleware/passportAuth.middleware");
const middleware = require("../middleware/index.middleware");

// Admin routes
router.post(
  "/add-product",
  // passport.authenticate("jwt", { session: false }),
  // middleware.roleAdminCheck
  controller.product.addProduct
);

// user route
router.get(
  "/get-products",
  // passport.authenticate("jwt", { session: false }),
  // middleware.roleUserCheck
  controller.product.getAllProducts
);

module.exports = router;

const express = require("express");
const router = express.Router();
const controller = require("../../controllers/index.controller");
const passport = require("../../middleware/passportAuth.middleware");
const middleware = require("../../middleware/index.middleware");

router.get(
  "/get-products",
  passport.authenticate("jwt", { session: false }),
  middleware.salesRoleCheck,
  controller.salesController.product.getAllProducts
);

router.get(
  "/get-product/:productId",
  passport.authenticate("jwt", { session: false }),
  middleware.salesRoleCheck,
  controller.salesController.product.getProductInformation
);

module.exports = router;

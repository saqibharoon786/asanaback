const express = require("express");
const router = express.Router();
const upload = require("../../config/multer");
const controller = require("../../controllers/index.controller");
const passport = require("../../middleware/passportAuth.middleware");
const middleware = require("../../middleware/index.middleware");

// Admin routes
router.post(
  "/add-product",
  passport.authenticate("jwt", { session: false }),
  middleware.adminRoleCheck,
  upload.single("product_Image"),
  controller.adminController.product.addProduct
);

router.get(
  "/get-products",
  passport.authenticate("jwt", { session: false }),
  middleware.adminRoleCheck,
  controller.adminController.product.getAllProducts
);

router.delete(
  "/delete-product/:productId",
  passport.authenticate("jwt", { session: false }),
  middleware.adminRoleCheck,
  controller.adminController.product.deleteProduct
);

router.patch(
  "/update-product/:productId",
  passport.authenticate("jwt", { session: false }),
  middleware.adminRoleCheck,
  upload.single("product_Image"),
  controller.adminController.product.updateProduct
);

router.get(
  "/get-product/:productId",
  passport.authenticate("jwt", { session: false }),
  middleware.adminRoleCheck,
  controller.adminController.product.getProductInformation
);

// router.post(
//   "/user/add-product",
//   // passport.authenticate("jwt", { session: false }),
//   // middleware.userRoleCheck,
//   controller.product.addProduct
// );

module.exports = router;

const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const controller = require("../controllers/index.controller");
const passport = require("../middleware/passportAuth.middleware");
const middleware = require("../middleware/index.middleware");

router.post(
  "/add-product",
  passport.authenticate("jwt", { session: false }),
  middleware.checkPermission("create"),
  upload.single("product_Image"),
  controller.product.addProduct
);

router.get(
  "/get-products",
  passport.authenticate("jwt", { session: false }),
  middleware.checkPermission("read"),
  controller.product.getAllProducts
);

router.delete(
  "/delete-product/:productId",
  passport.authenticate("jwt", { session: false }),
  middleware.checkPermission("delete"),
  controller.product.deleteProduct
);

router.patch(
  "/update-product/:productId",
  passport.authenticate("jwt", { session: false }),
  middleware.checkPermission("update"),
  upload.single("product_Image"),
  controller.product.updateProduct
);

router.get(
  "/get-product/:productId",
  passport.authenticate("jwt", { session: false }),
  middleware.checkPermission("read"),
  controller.product.getProductInformation
);

module.exports = router;

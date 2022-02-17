const express = require("express");
const productController = require("../../controllers/product.controller");
const path = require("path");
const upload = require("../../middlewares/upload");

const router = express.Router();

router
  .route("/")
  .get(productController.getProducts)
  .post(productController.createProduct);

router.route("/find").get(productController.getProductCondition);

router
  .route("/:id")
  .delete(productController.deleteProduct)
  .patch(productController.updateProduct)
  .get(productController.getProduct);

module.exports = router;

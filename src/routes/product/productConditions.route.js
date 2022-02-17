const { Router } = require("express");
const { productCondtionController } = require("../../controllers");
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const upload = require("../../middlewares/upload");

const router = Router();

router
  .route("/")
  .post(
    upload.array("images", 5),
    productCondtionController.createProductCondtion
  )
  .get(productCondtionController.getProductCondtions);
router
  .route("/:id")
  .get(productCondtionController.getProductCondtion)
  .delete(productCondtionController.deleteProductCondtion)
  .put(productCondtionController.updateProductCondtion);

module.exports = router;

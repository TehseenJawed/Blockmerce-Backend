const { Router } = require("express");
const { addressDetailsController } = require("../../controllers");
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const upload = require("../../middlewares/upload");

const router = Router();

router
  .route("/")
  .post(addressDetailsController.createAddressDetail)
  .get(addressDetailsController.getAddressessDetails);

router
  .route("/:id")
  .get(addressDetailsController.getAddressDetail)
  .delete(addressDetailsController.deleteAddress)
  .patch(addressDetailsController.updateAddress);

module.exports = router;

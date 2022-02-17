const { Router } = require("express");
const { paymentDetailsController } = require("../../controllers");
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const upload = require("../../middlewares/upload");

const router = Router();

router
  .route("/")
  .post(
    paymentDetailsController.createPaymentDetails
  )
  .get(paymentDetailsController.getPaymentsDetails);
router
  .route("/:id")
  .get(paymentDetailsController.getPaymentDetails)
  .delete(paymentDetailsController.deletePaymentDetails)
  .put(paymentDetailsController.updatePaymentDetails);

module.exports = router;

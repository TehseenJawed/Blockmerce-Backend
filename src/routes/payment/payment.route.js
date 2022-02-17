const { Router } = require("express");
const { paymentController } = require("../../controllers");
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const upload = require("../../middlewares/upload");

const router = Router();

router
  .route("/")
  .post(paymentController.createPayment)
  .get(paymentController.getPayments);

router.route("/stripe-payment").post(paymentController.stripePayment);
router
  .route("/:id")
  .get(paymentController.getPayment)
  .delete(paymentController.deletePayment)
  .put(paymentController.updatePayment);

module.exports = router;

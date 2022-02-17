const { Router } = require("express");
const { reviewController } = require("../../controllers");
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const upload = require("../../middlewares/upload");

const router = Router();

router
  .route("/")
  .post(
    reviewController.createReview
  )
  .get(reviewController.getReviews);
router
  .route("/:id")
  .get(reviewController.getReview)
  .delete(reviewController.deleteReview)
  .put(reviewController.updateReview);

module.exports = router;

const httpStatus = require("http-status");
const { reviewService } = require("../services");
const catchAsync = require("../utils/catchAsync");
const pick = require("../utils/pick");

const getReviews = catchAsync(async (req, res) => {
  const filters = pick(req.query, ["vendor", "isAvailable", "category"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const result = await reviewService.queryReview(filters, options);
  res.status(httpStatus.ACCEPTED).send(result);
});

const getReview = catchAsync(async (req, res) => {
  const result = await reviewService.getReviewById(req.params.id);
  res.status(httpStatus.ACCEPTED).send(result);
});
const createReview = catchAsync(async (req, res) => {
  req.body.averageRating =
    (req.body.qualityMaterialRating +
      req.body.sizeRating +
      req.body.deliverySpeedRating +
      req.body.communicationRating +
      req.body.ValueOfMoneyRating) /
    5;
  const result = await reviewService.createReview(req.body);

  res.status(httpStatus.CREATED).send(result);
});
const updateReview = catchAsync(async (req, res) => {
  const result = await reviewService.updateReviewById(req.params.id, req.body);
  res.status(httpStatus.ACCEPTED).send(result);
});
const deleteReview = catchAsync(async (req, res) => {
  const product = await reviewService.deleteReviewById(req.params.id);
  res.status(httpStatus.ACCEPTED).send(product);
});
module.exports = {
  createReview,
  getReviews,
  getReview,
  updateReview,
  deleteReview,
};

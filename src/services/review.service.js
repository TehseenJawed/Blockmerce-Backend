const httpStatus = require("http-status");
const { Review } = require("../models");
const ApiError = require("../utils/APIError");

const queryReview = async (
  filter,
  options,
  populateFirst = null,
  populateSecond = null
) => {
  const review = await Review.paginate(
    filter,
    options,
    populateFirst,
    populateSecond
  );
  return review;
};
const getReviewById = async (id) => {
  const review = await Review.findById(id);
  if (!review) {
    throw new ApiError(httpStatus.ACCEPTED, "no such payment Details Exist");
  }
  return review;
};

const updateReviewById = async (id, body) => {
  await getReviewById(id);
  const review = await Review.findByIdAndUpdate(id, body, {
    new: true,
  });
  return review;
};
const createReview = async (body) => {
  const review = await Review.create(body);
  return review;
};
const deleteReviewById = async (id) => {
  await getReviewById(id);
  const review = await Review.findByIdAndRemove(id);
  return review;
};
module.exports = {
  createReview,
  queryReview,
  updateReviewById,
  getReviewById,
  deleteReviewById,
};

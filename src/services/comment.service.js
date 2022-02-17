const httpStatus = require("http-status");
const { Comment } = require("../models");
const ApiError = require("../utils/APIError");

const queryComment = async (
  filter,
  options,
  populateFirst = null,
  populateSecond = null
) => {
  const comment = await Comment.paginate(
    filter,
    options,
    populateFirst,
    populateSecond
  );
  return comment;
};
const getCommentById = async (id) => {
  const comment = await Comment.findById(id);
  if (!comment) {
    throw new ApiError(httpStatus.ACCEPTED, "no such payment Details Exist");
  }
  return comment;
};

const updateCommentById = async (id, body) => {
  const comment = await Comment.findByIdAndUpdate(id, body, {
    new: true,
  });
  return comment;
};
const createComment = async (body) => {
  const comment = await Comment.create(body);
  return comment;
};
const deleteCommentById = async (id) => {
  await getCommentById(id);
  const comment = await Comment.findByIdAndDelete(id);
  return comment;
};
module.exports = {
  createComment,
  queryComment,
  updateCommentById,
  getCommentById,
  deleteCommentById,
};

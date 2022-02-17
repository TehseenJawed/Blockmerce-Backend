const httpStatus = require("http-status");
const { commentService } = require("../services");
const catchAsync = require("../utils/catchAsync");
const pick = require("../utils/pick");

const getComments = catchAsync(async (req, res) => {
  const filters = pick(req.query, ["shopId", "post", "product"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const result = await commentService.queryComment(filters, options);
  res.status(httpStatus.ACCEPTED).send(result);
});

const getComment = catchAsync(async (req, res) => {
  const result = await commentService.getCommentById(req.params.id);
  res.status(httpStatus.ACCEPTED).send(result);
});
const createComment = catchAsync(async (req, res) => {
  const result = await commentService.createComment(req.body);
  res.status(httpStatus.CREATED).send(result);
});
const updateComment = catchAsync(async (req, res) => {
  const result = await commentService.updateCommentById(
    req.params.id,
    req.body
  );
  res.status(httpStatus.ACCEPTED).send(result);
});
const deleteComment = catchAsync(async (req, res) => {
  const product = await commentService.deleteCommentById(req.params.id);
  res.status(httpStatus.ACCEPTED).send(product);
});
module.exports = {
  createComment,
  getComment,
  getComments,
  updateComment,
  deleteComment,
};

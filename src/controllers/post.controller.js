const httpStatus = require("http-status");
const { postService } = require("../services");
const catchAsync = require("../utils/catchAsync");
const pick = require("../utils/pick");

const getPosts = catchAsync(async (req, res) => {
  const filters = pick(req.query, ["vendor", "isAvailable", "category"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const result = await postService.queryPost(filters, options);
  res.status(httpStatus.ACCEPTED).send(result);
});

const getPost = catchAsync(async (req, res) => {
  const result = await postService.getPostById(req.params.id);
  res.status(httpStatus.ACCEPTED).send(result);
});
const createPost = catchAsync(async (req, res) => {
  const result = await postService.createPost(req.body);
  res.status(httpStatus.CREATED).send(result);
});
const updatePost = catchAsync(async (req, res) => {
  const result = await postService.updatePostById(req.params.id, req.body);
  res.status(httpStatus.ACCEPTED).send(result);
});
const deletePost = catchAsync(async (req, res) => {
  const product = await postService.deletePostById(req.params.id);
  res.status(httpStatus.ACCEPTED).send(product);
});
module.exports = {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
};

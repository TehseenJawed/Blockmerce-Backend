const httpStatus = require("http-status");
const { voteService } = require("../services");
const catchAsync = require("../utils/catchAsync");
const pick = require("../utils/pick");

const getVotes = catchAsync(async (req, res) => {
  const filters = pick(req.query, ["vendor", "isAvailable", "category"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const result = await voteService.queryVote(filters, options);
  res.status(httpStatus.ACCEPTED).send(result);
});

const getVote = catchAsync(async (req, res) => {
  const result = await voteService.getVoteById(req.params.id);
  res.status(httpStatus.ACCEPTED).send(result);
});
const createVote = catchAsync(async (req, res) => {
  const result = await voteService.createVote(req.body);
  res.status(httpStatus.CREATED).send(result);
});
const updateVote = catchAsync(async (req, res) => {
  const result = await voteService.updateVoteById(req.params.id, req.body);
  res.status(httpStatus.ACCEPTED).send(result);
});
const deleteVote = catchAsync(async (req, res) => {
  const product = await voteService.deleteVoteById(req.params.id);
  res.status(httpStatus.ACCEPTED).send(product);
});
module.exports = {
  createVote,
  getVotes,
  getVote,
  updateVote,
  deleteVote,
};

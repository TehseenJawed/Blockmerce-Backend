const httpStatus = require("http-status");
const { replyService } = require("../services");
const catchAsync = require("../utils/catchAsync");
const pick = require("../utils/pick");

const getReplies = catchAsync(async (req, res) => {
  const filters = pick(req.query, ["vendor", "isAvailable", "category"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const result = await replyService.queryReply(filters, options);
  res.status(httpStatus.ACCEPTED).send(result);
});

const getReply = catchAsync(async (req, res) => {
  const result = await replyService.getReplyById(req.params.id);
  res.status(httpStatus.ACCEPTED).send(result);
});
const createReply = catchAsync(async (req, res) => {
  const result = await replyService.createReply(req.body);
  res.status(httpStatus.CREATED).send(result);
});
const updateReply = catchAsync(async (req, res) => {
  const result = await ReplyService.updateReplyById(req.params.id, req.body);
  res.status(httpStatus.ACCEPTED).send(result);
});
const deleteReply = catchAsync(async (req, res) => {
  const result = await replyService.deleteReplyById(req.params.id);
  res.status(httpStatus.ACCEPTED).send(result);
});
module.exports = {
  createReply,
  getReply,
  getReplies,
  updateReply,
  deleteReply,
};

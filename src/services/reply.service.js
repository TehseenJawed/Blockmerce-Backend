const httpStatus = require("http-status");
const { Reply } = require("../models");
const ApiError = require("../utils/APIError");

const queryReply = async (
  filter,
  options,
  populateFirst = null,
  populateSecond = null
) => {
  const reply = await Reply.paginate(
    filter,
    options,
    populateFirst,
    populateSecond
  );
  return reply;
};
const getReplyById = async (id) => {
  const reply = await Reply.findById(id);
  if (!reply) {
    throw new ApiError(httpStatus.ACCEPTED, "no such payment Details Exist");
  }
  return reply;
};

const updateReplyById = async (id, body) => {
  await getReplyById(id);
  const Reply = await Reply.findByIdAndUpdate(id, body, {
    new: true,
  });
  return Reply;
};
const createReply = async (body) => {
  const Reply = await Reply.create(body);
  return Reply;
};
const deleteReplyById = async (id) => {
  await getReplyById(id);
  const Reply = await Reply.findByIdAndRemove(id);
  return Reply;
};
module.exports = {
  createReply,
  queryReply,
  updateReplyById,
  getReplyById,
  deleteReplyById,
};

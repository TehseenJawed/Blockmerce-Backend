const httpStatus = require("http-status");
const { chatService, userService, vendorService } = require("../services");
const catchAsync = require("../utils/catchAsync");
const pick = require("../utils/pick");

const getChats = catchAsync(async (req, res) => {
  const filters = pick(req.query, ["conversationId", "members"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const result = await chatService.queryChat(filters, options);
  res.send(result).status(httpStatus.ACCEPTED);
});

const getChat = catchAsync(async (req, res) => {
  const result = await chatService.getChatById(req.params.id);
  res.send(result).status(httpStatus.ACCEPTED);
});
const createChat = catchAsync(async (req, res) => {
  const result = await chatService.createChat(req.body);
  res.status(httpStatus.CREATED).send(result);
});
const updateChat = catchAsync(async (req, res) => {
  const result = await chatService.updateChatById(req.params.id, req.body);
  res.send(result).status(httpStatus.ACCEPTED);
});
const deleteChat = catchAsync(async (req, res) => {
  const result = await chatService.deleteChatById(req.params.id);
  res.send(result).status(httpStatus.ACCEPTED);
});

const getUsersForChat = catchAsync(async (req, res) => {
  console.log(req.query);
  const { type, id } = req.query;
  let user;
  if (type == "user") {
    const options = pick(req.query, ["sortby", "limit", "page"]);
    user = await userService.getUserByIdForChat(options, id);
  }
  if (type == "shop") {
    const options = pick(req.query, ["sortby", "limit", "page"]);
    user = await vendorService.getShopByIdForChat(options, id);
  }
  res.status(200).send(user);
});

const getUsersForInbox = catchAsync(async (req, res) => {
  const chats = await chatService.getChatsForInbox(req.query.id);
  res.status(200).send(chats);
});

const getChatPopulated = catchAsync(async (req, res) => {
  const result = await chatService(req.params.id);
  res.send(result).status(httpStatus.ACCEPTED);
});


module.exports = {
  getChat,
  getChats,
  createChat,
  deleteChat,
  updateChat,
  getUsersForChat,
  getUsersForInbox,
  getChatPopulated
};

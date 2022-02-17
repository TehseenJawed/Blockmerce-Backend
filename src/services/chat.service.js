const httpStatus = require("http-status");
const { Chat } = require("../models");
const ApiError = require("../utils/APIError");
const mongoose = require("mongoose");

const queryChat = async (
  filter,
  options,
  populateFirst = null,
  populateSecond = null
) => {
  const chat = await Chat.paginate(
    filter,
    options,
    populateFirst,
    populateSecond
  );
  return chat;
};

const setReadMessages = async (chatId) => {
  const conversation = await Chat.findOne({ conversationId: chatId }).exec();
  if (conversation)
    conversation.messages.forEach((element) => {
      element.status = true;
    });

  conversation.save();
};

const getChatById = async (id) => {
  const chat = await Chat.findById(id).sort({ messages: -1 });
  if (!chat) {
    throw new ApiError(httpStatus.BAD_REQUEST, "no such Chat Details Exist");
  }
  return chat;
};

const updateChatById = async (id, body) => {
  const chat = await Chat.findByIdAndUpdate(id, body, {
    new: true,
  });
  return chat;
};
const createChat = async (body) => {
  const chat = await Chat.create(body);
  return chat;
};
const deleteChatById = async (id) => {
  const chat = await getChatDetailById(id);
  const deletedChat = await Chat.findByIdAndDelete(chat.id);
  return deletedChat;
};

const getChatsForInbox = async (id) => {
  console;
  const mongoId = mongoose.Types.ObjectId(id);
  // const user = await Chat.find({ members: { $elemMatch: { $eq: mongoId } } });
  const user = await Chat.aggregate([
    {
      $match: {
        $or: [{ receiver: mongoId }, { sender: mongoId }],
      },
    },
    {
      $lookup: {
        from: "users",
        let: { sender: "$sender" },
        as: "senders",
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [{ $eq: ["$_id", "$$sender"] }],
              },
            },
          },
        ],
      },
    },
    {
      $lookup: {
        from: "users",
        let: { receiver: "$receiver" },
        as: "senders",
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [{ $eq: ["$_id", "$$receiver"] }],
              },
            },
          },
        ],
      },
    },
    {
      $lookup: {
        from: "vendors",
        let: { sender: "$sender" },
        as: "senders",
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [{ $eq: ["$_id", "$$sender"] }],
              },
            },
          },
        ],
      },
    },
    {
      $lookup: {
        from: "vendors",
        let: { receiver: "$receiver" },
        as: "receivers",
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [{ $eq: ["$_id", "$$receiver"] }],
              },
            },
          },
        ],
      },
    },
    // {
    //   $match: {
    //     $or: [{ receiver: id }, { sender: id }],
    //   },
    // },
    // {
    //   $sort: { createdAt: -1 },
    // },
    // {
    //   $limit: 10,
    // },
  ]);

  return user;
  // const users = user;
  // const limit = parseInt(options.limit, 10) || 10;
  // const page = parseInt(options.page, 10) || 1;
  // const totalResults = users.length;
  // const skipper = (page - 1) * limit;
  // const Pages = Math.ceil(totalResults / limit);
  // const result = users.slice(skipper, skipper + limit);

  // return { limit, page, totalResults, Pages, result };
};

const handleChat = async (payload) => {
  console.log(payload, "<=====handleChat payload");
  const { text, sender, receiver, conversationId } = payload;
  const chatFound = await Chat.findOne({
    conversationId,
  });
  if (chatFound) {
    chatFound.messages = [...chatFound.messages, { text, sender, receiver }];
    await Chat.findByIdAndUpdate(chatFound.id, {
      messages: chatFound.messages,
    });
    return;
  }
  const newChat = await Chat.create({
    conversationId: payload.conversationId,
    sender: payload.sender,
    receiver: payload.receiver,
    messages: [
      {
        text: payload.text,
        sender: payload.sender,
        receiver: payload.receiver,
      },
    ],
  });
  console.log("NEW CHAT CREATED");
  return newChat;
};

module.exports = {
  createChat,
  queryChat,
  updateChatById,
  getChatById,
  deleteChatById,
  handleChat,
  getChatsForInbox,
  setReadMessages,
};

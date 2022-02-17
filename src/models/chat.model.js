const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");
const chatSchema = mongoose.Schema(
  {
    conversationId: { type: String, required: true, unique: true },
    sender: { type: mongoose.Schema.Types.ObjectId, required: true },
    receiver: { type: mongoose.Schema.Types.ObjectId, required: true },
    messages: [
      {
        text: { type: String, required: true },
        sender: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
          required: true,
        },
        receiver: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
          required: true,
        },
        // senderId: { type: String, required: true },
        // senderName: { type: String, required: true },
        // receiverId: { type: String, required: true },
        status: { type: Boolean, default: 0 },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
chatSchema.plugin(toJSON);
chatSchema.plugin(paginate);

const Chat = mongoose.model("chat", chatSchema);
module.exports = Chat;

const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");
const replySchema = mongoose.Schema(
  {
    comment: { type: mongoose.Schema.Types.ObjectId, ref: "comment" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    shop: { type: mongoose.Schema.Types.ObjectId, ref: "vendor" },
    text: { type: String, required: true },
    upvotes: [{ type: mongoose.Schema.Types.ObjectId }],
    downvotes: [{ type: mongoose.Schema.Types.ObjectId }],
  },
  {
    timestamps: true,
  }
);
// add plugin that converts mongoose to json
replySchema.plugin(toJSON);
replySchema.plugin(paginate);

const Reply = mongoose.model("reply", replySchema);
module.exports = Reply;

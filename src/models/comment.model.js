const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");
const discussionSchema = mongoose.Schema(
  {
    post: { type: mongoose.Schema.Types.ObjectId, ref: "post" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    shop: { type: mongoose.Schema.Types.ObjectId, ref: "vendor" },
    text: { type: String, required: true },
    upvotes: [{ type: mongoose.Schema.Types.ObjectId, default: [] }],
    downvotes: [{ type: mongoose.Schema.Types.ObjectId, default: [] }],
  },
  {
    timestamps: true,
  }
);
// add plugin that converts mongoose to json
discussionSchema.plugin(toJSON);
discussionSchema.plugin(paginate);

const Comment = mongoose.model("discussion", discussionSchema);
module.exports = Comment;

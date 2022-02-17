const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");
const postSchema = mongoose.Schema(
  {
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "vendor",
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    // productConditions: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "product-condition",
    //   required: true,
    // },
  },
  {
    timestamps: true,
  }
);
// add plugin that converts mongoose to json
postSchema.plugin(toJSON);
postSchema.plugin(paginate);

const Post = mongoose.model("post", postSchema);
module.exports = Post;

const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");
const wishlistSchema = mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
// add plugin that converts mongoose to json
wishlistSchema.plugin(toJSON);
wishlistSchema.plugin(paginate);
const Wishlist = mongoose.model("wishlist", wishlistSchema);
module.exports = Wishlist;

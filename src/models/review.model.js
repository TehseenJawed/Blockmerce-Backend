const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");
const reviewSchema = mongoose.Schema(
  {
    post: { type: mongoose.Schema.Types.ObjectId, ref: "post" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    text: { type: String, required: true },
    averageRating: { type: Number, required: true, min: 0, max: 5 },
    qualityMaterialRating: { type: Number, required: true, min: 0, max: 5 },
    sizeRating: { type: Number, required: true, min: 0, max: 5 },
    deliverySpeedRating: { type: Number, required: true, min: 0, max: 5 },
    communicationRating: { type: Number, required: true, min: 0, max: 5 },
    ValueOfMoneyRating: { type: Number, required: true, min: 0, max: 5 },
  },
  {
    timestamps: true,
  }
);
// add plugin that converts mongoose to json
reviewSchema.plugin(toJSON);
reviewSchema.plugin(paginate);

const Review = mongoose.model("review", reviewSchema);
module.exports = Review;

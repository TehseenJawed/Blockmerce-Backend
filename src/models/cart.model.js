const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");
const discussionSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId },
    userType: { type: String },
    cartAmount: { type: Number },
    cart: [
      {
        selectedCondition: { type: Array },
        seller: {
          type: Object,
          required: true,
        },
        productId: {
          type: Object,
          required: true,
        },
        selectedSize: { type: String, required: true },
        allSizes: { type: Array },
        colourId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "colour",
          required: true,
        },
        colourValue: { type: String },
        selectedColour: { type: String, required: true },
        productCartQuantity: { type: Number, default: 1 },
        productCondition: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product_condition",
            required: true,
          },
        ],
        price: { type: Number, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);
// add plugin that converts mongoose to json
discussionSchema.plugin(toJSON);
discussionSchema.plugin(paginate);

const Cart = mongoose.model("cart", discussionSchema);
module.exports = Cart;

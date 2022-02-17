const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");
const productConditionSchema = mongoose.Schema(
  {
    colour: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "colour",
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      default: 0,
      required: true,
    },
    stock: {
      type: Number,
      default: 0,
    },
    priceReduction: {
      type: String,
      require: true,
    },
    image: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);
// add plugin that converts mongoose to json
productConditionSchema.plugin(toJSON);
productConditionSchema.plugin(paginate);
const ProductCondition = mongoose.model(
  "product_condition",
  productConditionSchema
);
module.exports = ProductCondition;

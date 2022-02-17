const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");
const productSchema = mongoose.Schema({
  shopId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "vendor",
    required: true,
  },
  brandName: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
    required: true,
  },
  guarantee: { type: String, required: true },
  deliveryPrice: { type: String, required: true },
  productCondition: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product_condition",
      required: true,
    },
  ],
});
// add plugin that converts mongoose to json
productSchema.plugin(toJSON);
productSchema.plugin(paginate);
const Product = mongoose.model("product", productSchema);
module.exports = Product;

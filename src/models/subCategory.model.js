const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");
const SubCategorySchema = mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      required: true,
    },
    name: { type: String, required: true },
    type: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
// add plugin that converts mongoose to json
SubCategorySchema.plugin(toJSON);
SubCategorySchema.plugin(paginate);
const SubCategory = mongoose.model("subcategory", SubCategorySchema);
module.exports = SubCategory;
 
const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");
const categorySchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    size: { type: Array },
  },
  {
    timestamps: true,
  }
);
// add plugin that converts mongoose to json
categorySchema.plugin(toJSON);
categorySchema.plugin(paginate);
const Category = mongoose.model("category", categorySchema);
module.exports = Category;

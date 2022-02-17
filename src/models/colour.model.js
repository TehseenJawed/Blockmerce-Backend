const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");
const colourSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
// add plugin that converts mongoose to json
colourSchema.plugin(toJSON);
colourSchema.plugin(paginate);

const Colour = mongoose.model("colour", colourSchema);
module.exports = Colour;

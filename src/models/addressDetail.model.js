const { string } = require("joi");
const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");
const addressSchema = mongoose.Schema(
  {
    shopId: { type: mongoose.Schema.Types.ObjectId, ref: "vendor" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    addressLineOne: { type: String, required: true },
    addressLineTwo: { type: String, required: true },
    town: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
// add plugin that converts mongoose to json
addressSchema.plugin(toJSON);
addressSchema.plugin(paginate);
const AddressDetail = mongoose.model("address-detail", addressSchema);
module.exports = AddressDetail;

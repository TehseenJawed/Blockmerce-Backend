const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");
const productSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    shopId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "vendor",
    },
    cardNumber: { type: String, required: true, minlegth: 16 },
    nameOnCard: { type: String, required: true },
    securityCode: { type: String, required: true },
    expiryDate: { type: String, required: true },
    postCode: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
// add plugin that converts mongoose to json
productSchema.plugin(toJSON);
productSchema.plugin(paginate);

const PaymentDetail = mongoose.model("payment", productSchema);
module.exports = PaymentDetail;

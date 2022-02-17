    const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");
const NotificationTokenSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
    },
    token: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
// add plugin that converts mongoose to json
NotificationTokenSchema.plugin(toJSON);
NotificationTokenSchema.plugin(paginate);
const NotificationToken = mongoose.model(
  "notification_token",
  NotificationTokenSchema
);
module.exports = NotificationToken;

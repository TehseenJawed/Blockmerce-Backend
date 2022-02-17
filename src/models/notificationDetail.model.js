const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const NotificationDetailSchema = mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
    },
    senderType: {
      type: String,
    },
    message: {
      type: String,
    },
    date: {
      type: String,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
    },
    receiverType: {
      type: String,
    },
    notificationType: {
      type: String,
    },
    affiliation: {
      type: mongoose.Schema.Types.ObjectId,
    },
    // expire_at: { type: Date, default: Date.now, expires: 172800 },
  },
  {
    timestamps: true,
  }
);
// add plugin that converts mongoose to json
NotificationDetailSchema.plugin(toJSON);
NotificationDetailSchema.plugin(paginate);

// NotificationDetailSchema.set("autoIndex", false);

// NotificationDetailSchema.index({ expire_at: 1 }, { expireAfterSeconds: 5 });

const NotificationDetail = mongoose.model(
  "notification_detail",
  NotificationDetailSchema
);
module.exports = NotificationDetail;

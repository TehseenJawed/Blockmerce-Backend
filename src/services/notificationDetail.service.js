const httpStatus = require("http-status");
const { NotificationDetail } = require("../models");
const ApiError = require("../utils/APIError");
const mongoose = require("mongoose");

const queryNotificationDetail = async (
  filter,
  options,
  populateFirst = null,
  populateSecond = null
) => {
  const notificationDetail = await NotificationDetail.paginate(
    filter,
    options,
    populateFirst,
    populateSecond
  );
  return notificationDetail;
};
const getNotificationDetailById = async (id) => {
  const notificationDetail = await NotificationDetail.findById(id);
  if (!NotificationDetail) {
    throw new ApiError(
      httpStatus.ACCEPTED,
      "no such NotificationDetail Details Exist"
    );
  }
  return notificationDetail;
};

const updateNotificationDetailById = async (id, body) => {
  const chk = await getNotificationDetailDetailById(id);
  const notificationDetail = await NotificationDetail.findByIdAndUpdate(
    chk.id,
    body,
    {
      new: true,
    }
  );
  return notificationDetail;
};
const createNotificationDetail = async (body) => {
  console.log(body);
  const notificationDetail = await NotificationDetail.create(body);
  return notificationDetail;
};
const deleteNotificationDetailById = async (id) => {
  const notificationDetail = await getNotificationDetailDetailById(id);
  const deletedNotificationDetail = await NotificationDetail.findByIdAndDelete(
    notificationDetail.id
  );
  return deletedNotificationDetail;
};

const getNotificationDetailByUserId = async (body) => {
  const ID = mongoose.Types.ObjectId(body.id);
  if (body.type == "shop") {
    const notification = await ifItsShop(ID);
    return notification;
  }
  const notification = await ifItsUser(ID);
  return notification;
};

// const ifItsShop = async (id) => {
//   const notification = await NotificationDetail.find({
//     $or: [{ senderShop: id }, { receiverShop: id }],
//   });
//   return notification;
// };

const ifItsShop = async (id) => {
  const notification = await NotificationDetail.aggregate([
    // {
    //   $lookup: {
    //     from: "users",
    //     localField: "sender",
    //     foreignField: "_id",
    //     as: "SenderDetail",
    //   },
    // },
    // {
    //   $lookup: {
    //     from: "vendors",
    //     localField: "sender",
    //     foreignField: "_id",
    //     as: "SenderDetail",
    //   },
    // },
    {
      $lookup: {
        from: "users",
        let: { sender: "$sender" },
        as: "senderDetail",
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [{ $eq: ["$_id", "$$sender"] }],
              },
            },
          },
        ],
      },
    },
    {
      $lookup: {
        from: "vendors",
        let: { sender: "$sender" },
        as: "senderDetail",
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [{ $eq: ["$_id", "$$sender"] }],
              },
            },
          },
        ],
      },
    },
    {
      $match: {
        $or: [{ receiver: id }, { sender: id }],
      },
    },
  ]);
  return notification;
};

const ifItsUser = async (id) => {
  console.log("user");
  const notification = await NotificationDetail.aggregate([
    // {
    //   $lookup: {
    //     from: "users",
    //     localField: "sender",
    //     foreignField: "_id",
    //     as: "SenderDetail",
    //   },
    // },
    // {
    //   $lookup: {
    //     from: "vendors",
    //     localField: "sender",
    //     foreignField: "_id",
    //     as: "SenderDetail",
    //   },
    // },
    {
      $lookup: {
        from: "users",
        let: { sender: "$sender" },
        as: "senderDetail",
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [{ $eq: ["$_id", "$$sender"] }],
              },
            },
          },
        ],
      },
    },
    {
      $lookup: {
        from: "vendors",
        let: { sender: "$sender" },
        as: "senderDetail",
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [{ $eq: ["$_id", "$$sender"] }],
              },
            },
          },
        ],
      },
    },
    {
      $match: {
        $or: [{ receiver: id }, { sender: id }],
      },
    },
    {
      $sort: { createdAt: -1 },
    },
    {
      $limit: 10,
    },
  ]);
  return notification;
};

module.exports = {
  createNotificationDetail,
  queryNotificationDetail,
  updateNotificationDetailById,
  getNotificationDetailById,
  deleteNotificationDetailById,
  getNotificationDetailByUserId,
};

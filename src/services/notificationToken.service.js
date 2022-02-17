const httpStatus = require("http-status");
const { NotificationToken } = require("../models");
const ApiError = require("../utils/APIError");

const queryNotificationToken = async (
  filter,
  options,
  populateFirst = null,
  populateSecond = null
) => {
  const notificationToken = await NotificationToken.paginate(
    filter,
    options,
    populateFirst,
    populateSecond
  );
  return notificationToken;
};
const getNotificationTokenById = async (id) => {
  const notificationToken = await NotificationToken.findById(id);
  if (!notificationToken) {
    throw new ApiError(
      httpStatus.ACCEPTED,
      "no such NotificationToken Details Exist"
    );
  }
  return notificationToken;
};

const getNotificationTokenByUserId = async (id) => {
  const notificationToken = await NotificationToken.findOne({ user: id });
  // if (notificationToken) {
  //   throw new ApiError(httpStatus.BAD_REQUEST, "no token found");
  // }
  return notificationToken;
};

const updateNotificationTokenByIdWhenLoggingIn = async (id, body) => {
  const notificationToken = await NotificationToken.findByIdAndUpdate(
    id,
    body,
    {
      new: true,
    }
  );
  return notificationToken;
};

const updateNotificationTokenById = async (id, body) => {
  const chk = await getNotificationTokenDetailById(id);
  const notificationToken = await NotificationToken.findByIdAndUpdate(
    chk.id,
    body,
    {
      new: true,
    }
  );
  return notificationToken;
};
const createNotificationToken = async (body) => {
  const notificationToken = await NotificationToken.create(body);
  return notificationToken;
};
const deleteNotificationTokenDetailById = async (id) => {
  const notificationToken = await getNotificationTokenDetailById(id);
  const deletedNotificationToken = await NotificationToken.findByIdAndDelete(
    notificationToken.id
  );
  return deletedNotificationToken;
};
module.exports = {
  createNotificationToken,
  queryNotificationToken,
  updateNotificationTokenById,
  getNotificationTokenById,
  deleteNotificationTokenDetailById,
  getNotificationTokenByUserId,
  updateNotificationTokenByIdWhenLoggingIn,
};

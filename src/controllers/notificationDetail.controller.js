const httpStatus = require("http-status");
const { notificationDetailService } = require("../services");
const ApiError = require("../utils/APIError");
const catchAsync = require("../utils/catchAsync");
const pick = require("../utils/pick");

const getNotificationDetails = catchAsync(async (req, res) => {
  const filters = pick(req.query, ["category", "name", "type"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const result = await notificationDetailService.queryNotificationDetail(
    filters,
    options
  );
  res.send(result).status(httpStatus.ACCEPTED);
});

const getNotificationDetail = catchAsync(async (req, res) => {
  const result = await notificationDetailService.getNotificationDetailById(
    req.params.id
  );
  res.send(result).status(httpStatus.ACCEPTED);
});
const createNotificationDetail = catchAsync(async (req, res) => {
  console.log("WE ARE HERE", req.body);
  const result = await notificationDetailService.createNotificationDetail(
    req.body
  );
  res.status(httpStatus.CREATED).send(result);
});
const updateNotificationDetail = catchAsync(async (req, res) => {
  const result = await notificationDetailService.updateNotificationDetailById(
    req.params.id,
    req.body
  );
  res.send(result).status(httpStatus.ACCEPTED);
});
const deleteNotificationDetail = catchAsync(async (req, res) => {
  const result = await notificationDetailService.deleteNotificationDetailById(
    req.params.id
  );
  res.send(result).status(httpStatus.ACCEPTED);
});

const getNotificationDetailByUser = catchAsync(async (req, res) => {
  if (!req.query.type || !req.query.id) {
    throw new ApiError(httpStatus.BAD_REQUEST, "no id or type");
  }
  const result = await notificationDetailService.getNotificationDetailByUserId(
    req.query
  );
  res.send(result).status(httpStatus.ACCEPTED);
});

module.exports = {
  getNotificationDetails,
  getNotificationDetail,
  createNotificationDetail,
  deleteNotificationDetail,
  updateNotificationDetail,
  getNotificationDetailByUser,
};

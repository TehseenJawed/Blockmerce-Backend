const httpStatus = require("http-status");
const { notificationTokenService } = require("../services");
const catchAsync = require("../utils/catchAsync");
const pick = require("../utils/pick");

const getNotificationTokens = catchAsync(async (req, res) => {
  const filters = pick(req.query, ["category", "name", "type"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const result = await notificationTokenService.queryNotificationToken(
    filters,
    options
  );
  res.send(result).status(httpStatus.ACCEPTED);
});

const getNotificationToken = catchAsync(async (req, res) => {
  const result = await notificationTokenService.getNotificationTokenById(
    req.params.id
  );
  res.send(result).status(httpStatus.ACCEPTED);
});
const createNotificationToken = catchAsync(async (req, res) => {
  const result = await notificationTokenService.createNotificationToken(
    req.body
  );
  res.status(httpStatus.CREATED).send(result);
});
const updateNotificationToken = catchAsync(async (req, res) => {
  const result = await notificationTokenService.updateNotificationTokenById(
    req.params.id,
    req.body
  );
  res.send(result).status(httpStatus.ACCEPTED);
});
const deleteNotificationToken = catchAsync(async (req, res) => {
  const result = await notificationTokenService.deleteNotificationTokensById(
    req.params.id
  );
  res.send(result).status(httpStatus.ACCEPTED);
});
module.exports = {
  getNotificationTokens,
  getNotificationToken,
  createNotificationToken,
  deleteNotificationToken,
  updateNotificationToken,
};

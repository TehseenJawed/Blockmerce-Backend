const httpStatus = require("http-status");
const {
  notificationService,
  notificationTokenService,
} = require("../services");
const ApiError = require("../utils/APIError");
const catchAsync = require("../utils/catchAsync");
const pick = require("../utils/pick");

const getNotification = catchAsync(async (req, res) => {
  // const user = await notificationTokenService.getNotificationTokenByUserId(
  //   req.body.receiverId
  // );
  // req.body.token = user.token;
  const noti = await notificationService.getNotification(req);
  res.status(httpStatus.ACCEPTED).send(noti);
});

const createRoom = catchAsync(async (req, res) => {
  const noti = await notificationService.createRoom(req);
  res.status(httpStatus.CREATED).send(noti);
});

const joinRoom = catchAsync(async (req, res) => {
  const noti = await notificationService.joinRoom(req);
  res.status(httpStatus.ACCEPTED).send(noti);
});

const getToken = catchAsync(async (req, res) => {
  const noti = await notificationService.getToken(req);
  res.status(httpStatus.ACCEPTED).send(noti);
});

const showRecording = catchAsync(async (req, res) => {
  const noti = await notificationService.showRecording(req);
  console.log(noti, "<====noti");
  res.status(httpStatus.ACCEPTED).send(noti);
});

const getRoom = catchAsync(async (req, res) => {
  const noti = await notificationService.getRoom(req);
  console.log(noti);
  res.status(httpStatus.ACCEPTED).send(noti);
});

const getRecording = catchAsync(async (req, res) => {
  const noti = await notificationService.getRecording(req);
  res.status(httpStatus.ACCEPTED).send(noti);
});

module.exports = {
  getNotification,
  createRoom,
  joinRoom,
  getToken,
  showRecording,
  getRoom,
  getRecording,
};

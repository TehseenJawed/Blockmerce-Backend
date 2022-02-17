const httpStatus = require("http-status");
const {
  userService,
  tokenService,
  notificationTokenService,
} = require("../services");
const catchAsync = require("../utils/catchAsync");
const pick = require("../utils/pick");
const { getUser } = require("../validations/user.validation");

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req);
  const tokens = await tokenService.generateAuthTokens(user);
  const deviceToken = await notificationTokenService.createNotificationToken({
    token: req.body.notificationToken,
    user: user.id,
  });
  console.log(deviceToken);
  res.status(httpStatus.CREATED).send({ user, tokens, deviceToken });
});

const deleteUser = catchAsync(async (req, res) => {
  const user = await userService.deleteUserById(req.params.id);
  res.status(200).send(user);
});

const getUserById = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  res.status(200).send(user);
});

const getAllUser = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["email", "userName", "firstName"]);
  const options = pick(req.query, ["sortby", "limit", "page"]);
  const user = await userService.getAllUsers(filter, options);
  res.status(200).send(user);
});

const updateUserById = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.id, req);
  res.status(200).send(user);
});

const followUser = catchAsync(async (req, res) => {
  const user = await userService.followUserById(req.params.id, req.body);
  res.status(200).send(user);
});

const followShop = catchAsync(async (req, res) => {
  const user = await userService.followShopById(req.params.id, req.body);
  res.status(200).send(user);
});

const unfollowShop = catchAsync(async (req, res) => {
  const user = await userService.unfollowShopById(req.params.id, req.body);
  res.status(200).send(user);
});

const unfollowUser = catchAsync(async (req, res) => {
  const user = await userService.unfollowUserById(req.params.id, req.body);
  res.status(200).send(user);
});

module.exports = {
  createUser,
  deleteUser,
  getUserById,
  getAllUser,
  updateUserById,
  followUser,
  unfollowUser,
  followShop,
  unfollowShop,
};

const httpStatus = require("http-status");
const {
  authService,
  tokenService,
  notificationTokenService,
} = require("../services");
const catchAsync = require("../utils/catchAsync");

const login = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const { email, password, notificationToken } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  let deviceToken;
  const checkToken =
    await notificationTokenService.getNotificationTokenByUserId(user.id);
  if (!checkToken) {
    console.log(
      "no previous notification found ..... creating new notificatin token"
    );
      deviceToken = await notificationTokenService.createNotificationToken({
      token: notificationToken,
      user: user.id,
    });
    res.send({ user, tokens, deviceToken });
  } else {
    deviceToken =
      await notificationTokenService.updateNotificationTokenByIdWhenLoggingIn(
        checkToken.id,
        {
          token: notificationToken,
          user: user.id,
        }
      );
    res.send({ user, tokens, deviceToken });
  }
});

const loginWithGoogle = catchAsync(async (req, res) => {
  // const { notificationToken } = req.body;
  // const user = await authService.loginWithGoogle(req.body);
  // const tokens = await tokenService.generateAuthTokens(user);
  // const deviceToken = await notificationTokenService.createNotificationToken({
  //   token: notificationToken,
  //   user: user.id,
  // });
  // console.log(deviceToken);
  // res.send({ user, tokens, deviceToken });
  console.log(req.body);
  const { email, password, notificationToken } = req.body;
  // const user = await authService.loginUserWithEmailAndPassword(email, password);
  const user = await authService.loginWithGoogle(req.body);
  const tokens = await tokenService.generateAuthTokens(user);
  let deviceToken;
  const checkToken =
    await notificationTokenService.getNotificationTokenByUserId(user.id);
  if (!checkToken) {
    console.log(
      "no previous notification token found ..... creating new notificatin token"
    );
    deviceToken = await notificationTokenService.createNotificationToken({
      token: notificationToken,
      user: user.id,
    });
    res.status(200).send({ user, tokens, deviceToken });
  } else {
    deviceToken =
      await notificationTokenService.updateNotificationTokenByIdWhenLoggingIn(
        checkToken.id,
        {
          token: notificationToken,
          user: user.id,
        }
      );
    res.status(200).send({ user, tokens, deviceToken });
  }
});
const loginWithFacebook = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const { email, password, notificationToken } = req.body;
  const user = await authService.loginWithFacebook(req.body);
  const tokens = await tokenService.generateAuthTokens(user);
  let deviceToken;
  const checkToken =
    await notificationTokenService.getNotificationTokenByUserId(user.id);
  if (!checkToken) {
    console.log(
      "no previous notification found ..... creating new notificatin token"
    );
    deviceToken = await notificationTokenService.createNotificationToken({
      token: notificationToken,
      user: user.id,
    });
    res.send({ user, tokens, deviceToken });
  } else {
    deviceToken =
      await notificationTokenService.updateNotificationTokenByIdWhenLoggingIn(
        checkToken.id,
        {
          token: notificationToken,
          user: user.id,
        }
      );
    res.send({ user, tokens, deviceToken });
  }
});

module.exports = {
  login,
  loginWithGoogle,
  loginWithFacebook,
};

const httpStatus = require("http-status");
const userService = require("./user.service");
const vendorService = require("./vendor.service");
const config = require("../config/config");
const { OAuth2Client } = require("google-auth-library");
const ApiError = require("../utils/APIError");
/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await userService.getUserByEmail(email);
  if (!user) {
    const shop = await vendorService.findShopByEmail(email);
    if (!shop || !(await shop.isPasswordMatch(password))) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        "Incorrect email or password"
      );
    }
    console.log("shop logged in");
    return shop;
  }
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password");
  }
  console.log("user logged in");
  return user;
};

// const clientId =
// "108967418220-5n1vekv7gq5qv7ho0fumru1gfvhgpdv0.apps.googleusercontent.com";
const clientID = config.GOOGLE_CLIENT_ID;
const loginWithGoogle = async (body) => {
  const client = new OAuth2Client(clientID);
  const ticket = await client.verifyIdToken({
    idToken: body.idToken,
    audience: clientID, // Specify the CLIENT_ID of the app that accesses the backend
    // Or, if multiple clients access the backend:
    //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();
  const userid = payload["sub"];
  console.log(payload);
  console.log(userid, "<==============userId");
  if (!payload) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "something went wrong while connecting to google"
    );
  }
  if (payload && userid) {
    const check = await userService.getUserByGoogleId(userid);
    console.log(check, "<==============THIS IS CHECK");
    if (!check) {
      console.log("creating user");
      const user = await userService.createUserByGoogleId({
        googleId: userid,
        email: body.email,
        name: payload.name,
      });
      return user;
    }
    console.log("user already exists");
    return check;
  }
  throw new ApiError(
    httpStatus.ACCEPTED,
    "something went wrong while connecting with google"
  );
  // If request specified a G Suite domain:
  // const domain = payload['hd'];
};

const loginWithFacebook = async (body) => {
  const checkUser = await userService.getUserByFacebookToken(body.id);
  if (!checkUser) {
    const user = await userService.createUserByGoogleId({
      facebookId: body.id,
      email: body.email,
    });
    return user;
  }
  return checkUser;
};

module.exports = {
  loginUserWithEmailAndPassword,
  loginWithGoogle,
  loginWithFacebook,
};

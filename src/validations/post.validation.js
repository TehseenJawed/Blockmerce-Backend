const Joi = require("joi-oid");
const { password, objectId } = require("./custom.validation");

const createPost = {
  body: Joi.object().keys({
    shop: Joi.objectId(),
    user: Joi.objectId(),
    product: Joi.objectId().required(),
  }),
};

const getUsers = {
  query: Joi.object().keys({
    username: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    id: Joi.objectId().required(),
  }),
  body: Joi.object().keys({
    name: Joi.string(),
    isActive: Joi.boolean(),
    userType: Joi.objectId(),
    shopId: Joi.objectId(),
    bio: Joi.string(),
    followers: Joi.array(),
    following: Joi.array(),
    userName: Joi.string(),
    email: Joi.string(),
    password: Joi.string(),
    role: Joi.string(),
    profilePicture: Joi.string(),
    addressDetail: Joi.objectId(),
    paymentDetail: Joi.objectId(),
    website: Joi.string(),
    phoneNumber: Joi.string(),
    address: Joi.string(),
  }),
};
module.exports = {
  createPost,
};

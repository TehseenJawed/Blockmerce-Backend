const Joi = require("joi-oid");
const { password, objectId } = require("./custom.validation");

let cart = Joi.object().keys({
  seller: Joi.object().required(),
  productId: Joi.object().required(),
  selectedSize: Joi.string().required(),
  allSizes: Joi.array().required(),
  colourId: Joi.objectId().required(),
  colourValue: Joi.string().required(),
  selectedColour: Joi.string().required(),
  productCartQuantity: Joi.number().required(),
  productCondition: Joi.array().required(),
  price: Joi.number().required(),
});

const createCart = {
  body: Joi.object().keys({
    user: Joi.objectId().required(),
    userType: Joi.string().required(),
    cartAmount: Joi.number(),
    cart: Joi.array().items(cart).required(),
  }),
};

const updateCartOnlyById = {
  params: Joi.object().keys({
    id: Joi.objectId().required(),
  }),
  body: Joi.array().items(cart).required(),
};

const getCarts = {
  query: Joi.object().keys({
    Cartname: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getCart = {
  params: Joi.object().keys({
    CartId: Joi.string().custom(objectId),
  }),
};

const updateCart = {
  params: Joi.object().keys({
    id: Joi.objectId().required(),
  }),
  body: Joi.object().keys({
    name: Joi.string(),
    isActive: Joi.boolean(),
    CartType: Joi.objectId(),
    shopId: Joi.objectId(),
    bio: Joi.string(),
    followers: Joi.array(),
    following: Joi.array(),
    CartName: Joi.string(),
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
  getCart,
  getCarts,
  createCart,
  updateCart,
  updateCartOnlyById,
};

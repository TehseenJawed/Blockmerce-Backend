const httpStatus = require("http-status");
const {
  WorkflowContext,
} = require("twilio/lib/rest/taskrouter/v1/workspace/workflow");
const { Cart } = require("../models");
const ApiError = require("../utils/APIError");

const queryCart = async (
  filter,
  options,
  populateFirst = null,
  populateSecond = null
) => {
  const cart = await Cart.paginate(
    filter,
    options,
    populateFirst,
    populateSecond
  );
  // const cart = await Cart.find();
  return cart;
};
const getCartById = async (id) => {
  const cart = await Cart.findById(id)
    .populate("cart.productId")
    .populate("cart.productCondition")
    .populate("cart.seller");
  if (!cart) {
    throw new ApiError(httpStatus.ACCEPTED, "no such records Exist");
  }
  return cart;
};

const updateCartById = async (id, body) => {
  const check = await Cart.findById(id);
  if (!check) {
    throw new ApiError(httpStatus.BAD_REQUEST, "no such cart");
  }
  const cart = await Cart.findByIdAndUpdate(id, body, {
    new: true,
  });
  return cart;
};
const createCart = async (body) => {
  console.log(body, "<==== cart body create ");
  console.log(body.cart[0].seller, "<==== cart body create seller ");
  console.log(body.cart[0].productId, "<==== cart body create product ");

  const check = await Cart.findOne({ user: body.user });
  if (check) {
    console.log(check, "<====== prev cart");
    console.log(body, "<====== body");
    console.log(body.cart[0].productId, "<====== body");
    console.log(check.cart.length, "<==== length");
    console.log(
      body.cart[0].productCartQuantity,
      "<============================WOW"
    );
    let flag = false;
    await check.cart.map(async (item) => {
      if (
        item.productId.id == body.cart[0].productId.id &&
        item.selectedSize == body.cart[0].selectedSize &&
        item.selectedColour == body.cart[0].selectedColour
      ) {
        flag = true;
        item.productCartQuantity =
          item.productCartQuantity + body.cart[0].productCartQuantity;
        console.log(item.productCartQuantity, "<======== changed or not");
      }
    });
    if (flag == false) check.cart.push(body.cart[0]);
    console.log(check);
    const cart = await Cart.findByIdAndUpdate(check.id, check, { new: true });
    return cart;
  }
  const cart = await Cart.create(body);
  return cart;
};

// if (
//   item.productId === body.cart[0].productId &&
//   item.selectedSize === body.cart[0].selectedSize &&
//   item.selectedColour === body.cart[0].selectedColour
// ) {
//   console.log("i ran");
//   item.productCartQuantity += 1;
// }
const deleteCartById = async (id) => {
  const check = await Cart.findById(id);

  if (!check) {
    throw new ApiError(httpStatus.BAD_REQUEST, "no such cart");
  }
  const cart = await Cart.findByIdAndDelete(id);
  return cart;
};

const getCartByUserId = async (id) => {
  const cart = await Cart.findOne({ user: id });
  if (!cart) {
    throw new ApiError(httpStatus.ACCEPTED, "user have no cart");
  }
  return cart;
};

const updateCartByOnlyId = async (id, body) => {
  console.log(body, "<==== cart only update");
  const cart = await Cart.findByIdAndUpdate(id, { cart: body }, { new: true });
  return cart;
};

module.exports = {
  createCart,
  queryCart,
  updateCartById,
  getCartById,
  deleteCartById,
  getCartByUserId,
  updateCartByOnlyId,
};

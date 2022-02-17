const httpStatus = require("http-status");
const { cartService } = require("../services");
const catchAsync = require("../utils/catchAsync");
const pick = require("../utils/pick");

const getCarts = catchAsync(async (req, res) => {
  const filters = pick(req.query, ["shopId", "post", "product"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const result = await cartService.queryCart(filters, options);
  res.status(httpStatus.ACCEPTED).send(result);
});

const getCart = catchAsync(async (req, res) => {
  const result = await cartService.getCartById(req.params.id);
  res.status(httpStatus.ACCEPTED).send(result);
});
const createCart = catchAsync(async (req, res) => {
  console.log(req.body, "<==============boudy");
  const creation = await cartService.createCart(req.body);
  // const result = await cartService.getCartById(creation.id);
  res.status(httpStatus.CREATED).send(creation);
});
const updateCart = catchAsync(async (req, res) => {
  console.log(req.body, "<======= cart body");
  const result = await cartService.updateCartById(req.params.id, req.body);
  res.status(httpStatus.ACCEPTED).send(result);
});
const deleteCart = catchAsync(async (req, res) => {
  const result = await cartService.deleteCartById(req.params.id);
  res.status(httpStatus.ACCEPTED).send(result);
});
const getCartByUser = catchAsync(async (req, res) => {
  const result = await cartService.getCartByUserId(req.params.id);
  res.status(httpStatus.ACCEPTED).send(result);
});

const updateCartOnly = catchAsync(async (req, res) => {
  const result = await cartService.updateCartByOnlyId(req.params.id, req.body);
  res.status(httpStatus.ACCEPTED).send(result);
});

module.exports = {
  getCartByUser,
  createCart,
  getCart,
  getCarts,
  updateCart,
  deleteCart,
  updateCartOnly,
};

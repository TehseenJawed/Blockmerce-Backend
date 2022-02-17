const httpStatus = require("http-status");
const { productService } = require("../services");
const ApiError = require("../utils/APIError");
const catchAsync = require("../utils/catchAsync");
const pick = require("../utils/pick");

const getProducts = catchAsync(async (req, res) => {
  console.log("wow");
  const filters = pick(req.query, ["shopId", "name", "category"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const result = await productService.queryProducts(filters, options);
  res.send(result);
});
const getAllProducts = catchAsync(async (req, res) => {
  let product = await productService.getAllProducts();
  res.status(200).send(product);
});

const getProduct = catchAsync(async (req, res) => {
  const result = await productService.getProductById(req.params.id);
  res.send(result);
});
const createProduct = catchAsync(async (req, res) => {
  const result = await productService.createProduct(req.body);
  res.send(result).status(httpStatus.CREATED);
});
const updateProduct = catchAsync(async (req, res) => {
  const result = await productService.updateProduct(req.params.id, req.body);
  res.send(result);
});
const deleteProduct = catchAsync(async (req, res) => {
  const product = await productService.deleteProductById(req.params.id);
  res.send(product);
});

const getProductCondition = catchAsync(async (req, res) => {
  console.log(req.query, "<====req.query");
  if (!req.query.productId && !req.query.colourID && !req.query.size) {
    throw new ApiError(httpStatus.BAD_REQUEST, "data is missing");
  }
  const result = await productService.getProductConditionByColorAndSize(
    req.query
  );
  res.status(httpStatus.ACCEPTED).send(result);
});

module.exports = {
  getProducts,
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductCondition,
};

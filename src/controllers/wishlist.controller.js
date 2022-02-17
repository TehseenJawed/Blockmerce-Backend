const httpStatus = require("http-status");
const { wishlistService } = require("../services");
const ApiError = require("../utils/APIError");
const catchAsync = require("../utils/catchAsync");
const pick = require("../utils/pick");

const getWishlists = catchAsync(async (req, res) => {
  const filters = pick(req.query, ["product", "user"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const result = await wishlistService.queryWishlist(filters, options);
  res.send(result).status(httpStatus.ACCEPTED);
});

const getWishlist = catchAsync(async (req, res) => {
  const result = await wishlistService.getWishlistById(req.params.id);
  res.send(result).status(httpStatus.ACCEPTED);
});

const createWishlist = catchAsync(async (req, res) => {
  console.log(req.body);
  const check = await wishlistService.getWishlist(req.body);
  console.log(check, "<=====check");
  if (check) {
    throw new ApiError(httpStatus.ACCEPTED, "item already in your wishlist");
  }
  const result = await wishlistService.createWishlist(req.body);
  res.status(httpStatus.CREATED).send( );
});

const updateWishlist = catchAsync(async (req, res) => {
  const result = await wishlistService.updateWishlistById(
    req.params.id,
    req.body
  );
  res.send(result).status(httpStatus.ACCEPTED);
});

const deleteWishlist = catchAsync(async (req, res) => {
  const result = await wishlistService.deleteWishlistById(req.params.id);
  res.send(result).status(httpStatus.ACCEPTED);
});

const deleteWishlistByUserAndProduct = catchAsync(async (req, res) => {
  const result = await wishlistService.deleteWishlistByUserIdAndProductId(
    req.body
  );
  res.send(result).status(httpStatus.ACCEPTED);
});
module.exports = {
  getWishlist,
  getWishlists,
  createWishlist,
  deleteWishlist,
  updateWishlist,
  deleteWishlistByUserAndProduct,
};

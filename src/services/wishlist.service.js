const httpStatus = require("http-status");
const { Wishlist } = require("../models");
const { populate } = require("../models/user.model");
const ApiError = require("../utils/APIError");

const queryWishlist = async (
  filter,
  options,
  populateFirst = {
    path: "product",
    populate: "shopId",
  },
  populateSecond = null
) => {
  const wishlist = await Wishlist.paginate(
    filter,
    options,
    populateFirst,
    populateSecond
  );
  return wishlist;
};
const getWishlistById = async (id) => {
  const wishlist = await Wishlist.findById(id).populate({
    path: "product",
    populate: "shopId productCondition",
  });

  if (!wishlist) {
    throw new ApiError(httpStatus.ACCEPTED, "no such Wishlist Details Exist");
  }
  return wishlist;
};

const getWishlist = async (keys) => {
  const wishlist = await Wishlist.findOne(keys);
  return wishlist;
};
const updateWishlistById = async (id, body) => {
  const wishlist = await Wishlist.findByIdAndUpdate(id, body, {
    new: true,
  });
  return wishlist;
};
const createWishlist = async (body) => {
  const wishlist = await Wishlist.create(body);
  const chk = await getWishlistById(wishlist.id);

  return chk;
};
const deleteWishlistById = async (id) => {
  const wishlist = await getWishlistById(id);
  const deletedWishlist = await Wishlist.findByIdAndDelete(wishlist.id);
  return deletedWishlist;
};

const deleteWishlistByUserIdAndProductId = async (body) => {
  const wishlist = await getWishlist(body);
  if (!wishlist) {
    throw new ApiError(
      httpStatus.ACCEPTED,
      "product nolonger in your wishlist"
    );
  }
  const deletedWishlist = await Wishlist.findByIdAndDelete(wishlist.id);
  return deletedWishlist;
};
module.exports = {
  createWishlist,
  queryWishlist,
  updateWishlistById,
  getWishlistById,
  deleteWishlistById,
  getWishlist,
  deleteWishlistByUserIdAndProductId,
};

const httpStatus = require("http-status");
const userService = require("./user.service");
const { Vendor, User, Chat } = require("../models");
const ApiError = require("../utils/APIError");
const mongoose = require("mongoose");

/**
 * Create a Vendor
 * @param {Object} userBody
 * @returns {Promise<User>}
 */

const getUserByEmail = async (email) => {
  return await User.findOne({ email });
};

const createVendor = async (req) => {
  const check = await getUserByEmail(req.body.email);
  if (check) {
    throw new ApiError(httpStatus.ACCEPTED, "email already taken");
  }
  if (!req.file) {
    const user = await Vendor.create(req.body);
    return user;
  }
  req.body.profilePicture = req.file.filename;
  const user = await Vendor.create(req.body);
  return user;
};

/**
 * Query for Vendors
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const getVendorByEmail = async (email) => {
  const vendor = await Vendor.findOne({ email });
  return vendor;
};

const getVendors = async (filters, options, populateFirst = null) => {
  const vendor = await Vendor.paginate(filters, options, populateFirst);
  return vendor;
};

const findShopByEmail = async (email) => {
  return await Vendor.findOne({ email });
};

const getVendorById = async (id) => {
  const vendor = await Vendor.findById(id).populate([
    "addressDetail",
    "paymentDetail",
  ]);
  if (!vendor) {
    throw new ApiError(httpStatus.ACCEPTED, "No such Shop exists");
  }
  return vendor;
};

const getVendorByIdInChatSearch = async (id) => {
  const vendor = await Vendor.findById(id);
  return vendor;
};

const deleteVendorById = (id) => {
  const vendor = Vendor.findByIdAndDelete(id);
  return vendor;
};

const updateVendorById = (id, req) => {
  if (!req.file) {
    console.log(req.body);
    const vendor = Vendor.findByIdAndUpdate(id, req.body, { new: true });
    return vendor;
  }
  console.log(req.body);
  req.body.profilePicture = req.file.filename;
  const vendor = Vendor.findByIdAndUpdate(id, req.body, { new: true });
  return vendor;
};

const checkArray = (array, value) => {
  for (i = 0; i < array.length; i++) {
    if (array[i] == value) return 1;
  }
  console.log("======in check array=======");
  return 0;
};

function arrayRemove(arr, value) {
  return arr.filter(function (element) {
    return element != value;
  });
}

const unfollowShop = async (shop1, shop2) => {
  //user 1 is unfollowing user 2
  const unfollower = arrayRemove(shop1.followingShop, shop2.id); //here is array of user 1 after removing
  const unfollowee = arrayRemove(shop2.followerShop, shop1.id); //here is the array of user 2 after removing
  const user = await Vendor.findByIdAndUpdate(
    shop1.id,
    { followingShop: unfollower },
    { new: true }
  );
  await Vendor.findByIdAndUpdate(shop2.id, { followerShop: unfollowee });
  return user;
};

const followShop = async (shop1, shop2) => {
  shop1.followingShop.unshift(shop2.id);
  shop2.followerShop.unshift(shop1.id);
  const shop = await Vendor.findByIdAndUpdate(
    shop1.id,
    {
      followingShop: shop1.followingShop,
    },
    { new: true }
  );
  const shopOne = await Vendor.findByIdAndUpdate(
    shop2.id,
    {
      followerShop: shop2.followerShop,
    },
    { new: true }
  );
  return { shop, shopOne };
};

const followShopById = async (id, body) => {
  console.log(id, "<======follower");
  console.log(body, "<======followee");
  if (id == body.shopId) {
    throw new ApiError(httpStatus.BAD_REQUEST, "YOU CANT FOLLOW YOURSELF ");
  }

  const follower = await getVendorById(id);
  const followee = await getVendorById(body.shopId);
  const check = checkArray(followee.followerShop, id);
  if (check) {
    throw new ApiError(
      httpStatus.CONFLICT,
      follower.shopName + " already following " + followee.shopName
    );
  }
  const process = await followShop(follower, followee);
  if (!process) {
    throw new ApiError(
      httpStatus.CONFLICT,
      "something went wrong ,please try later"
    );
  }
  return process;
};

const unfollowShopById = async (id, body) => {
  console.log(id, "<======follower");
  console.log(body, "<======followee");
  if (id == body.shopId) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "YOU CAN UNFOLLOW YOURSELF YOU FA**OT"
    );
  }
  const follower = await getVendorById(id);
  const followee = await getVendorById(body.shopId);
  const check = checkArray(followee.followerShop, id);
  if (!check) {
    throw new ApiError(
      httpStatus.CONFLICT,
      "this " + follower.shopName + " already unfollowed " + followee.shopName
    );
  }
  const process = await unfollowShop(follower, followee);
  if (!process) {
    throw new ApiError(
      httpStatus.CONFLICT,
      "something went wrong ,please try later"
    );
  }
  return process;
};

const getShopByIdForChat = async (options, id) => {
  console.log(options);

  const shop = await Vendor.findById(id)
    .populate("followingShop")
    .populate("followerUser")
    .populate("followerShop")
    .populate("followingUser");

  if (!shop) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  console.log(shop);
  const users = shop.followerShop.concat(
    shop.followerUser,
    shop.followingShop,
    shop.followingUser
  );
  const limit = parseInt(options.limit, 10) || 10;
  const page = parseInt(options.page, 10) || 1;
  const totalResults = users.length;
  const skipper = (page - 1) * limit;
  const Pages = Math.ceil(totalResults / limit);
  const result = users.slice(skipper, skipper + limit);

  return { limit, page, totalResults, Pages, result };
};

const getInboxForShop = async (options, id) => {
  console.log(options);
  const mongoId = mongoose.Types.ObjectId(id);
  // const user = await Chat.find({ members: { $elemMatch: { $eq: mongoId } } });
  const user = await Chat.aggregate([
    {
      $match: { members: mongoId },
    },
    // {
    //   $lookup: {
    //     from: "users",
    //     let: { sender: "$members" },
    //     as: "senderDetail",
    //     pipeline: [
    //       {
    //         $match: {
    //           $expr: {
    //             $and: [{ $eq: ["$members", "$$sender"] }],
    //           },
    //         },
    //       },
    //     ],
    //   },
    // },
    { $unwind: "$members" },
    {
      $lookup: {
        from: "vendors",
        let: { sender: "$members" },
        as: "senderS",
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [{ $eq: ["$_id", "$$sender"] }],
              },
            },
          },
        ],
      },
    },
    // {
    //   $match: {
    //     $or: [{ receiver: id }, { sender: id }],
    //   },
    // },
    // {
    //   $sort: { createdAt: -1 },
    // },
    // {
    //   $limit: 10,
    // },
  ]);

  return user;
  // const users = user;
  // const limit = parseInt(options.limit, 10) || 10;
  // const page = parseInt(options.page, 10) || 1;
  // const totalResults = users.length;
  // const skipper = (page - 1) * limit;
  // const Pages = Math.ceil(totalResults / limit);
  // const result = users.slice(skipper, skipper + limit);

  // return { limit, page, totalResults, Pages, result };
};

module.exports = {
  createVendor,
  getVendors,
  getVendorById,
  deleteVendorById,
  updateVendorById,
  findShopByEmail,
  getVendorByEmail,
  followShopById,
  unfollowShopById,
  getShopByIdForChat,
  getShopByIdForChat,
  getVendorByIdInChatSearch,
  getInboxForShop,
};

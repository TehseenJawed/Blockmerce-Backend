const { vendorService, notificationService } = require("../services");
const catchAsync = require("../utils/catchAsync");
const httpStatus = require("http-status");
const pick = require("../utils/pick");

const createVendor = catchAsync(async (req, res) => {
  const vendor = await vendorService.createVendor(req);
  res.status(httpStatus.CREATED).send(vendor);
});

const getVendors = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["email", "userName", "firstName", "userId"]);
  const options = pick(req.query, ["sortby", "limit", "page"]);
  const vendor = await vendorService.getVendors(filter, options);
  res.status(200).send(vendor);
});

const getVendor = catchAsync(async (req, res) => {
  const vendor = await vendorService.getVendorById(req.params.id);
  res.status(200).send(vendor);
});
const deleteVendor = catchAsync(async (req, res) => {
  const vendor = await vendorService.deleteVendorById(req.params.id);
  res.status(200).send(vendor);
});

const updateVendor = catchAsync(async (req, res) => {
  const vendor = await vendorService.updateVendorById(req.params.id, req);
  res.status(200).send(vendor);
});

const followShop = catchAsync(async (req, res) => {
  console.log(req.params, "<=====params");
  console.log(req.body, "<=======body");
  const vendor = await vendorService.followShopById(req.params.id, req.body);
  // notificationService.sendNotificationForShopForFollow(vendor);
  res.status(200).send(vendor.shop);
});

const unfollowShop = catchAsync(async (req, res) => {
  console.log(req.params, "<=====params");
  console.log(req.body, "<=======body");
  const vendor = await vendorService.unfollowShopById(req.params.id, req.body);
  res.status(200).send(vendor);
});

module.exports = {
  createVendor,
  getVendors,
  getVendor,
  deleteVendor,
  updateVendor,
  followShop,
  unfollowShop,
};

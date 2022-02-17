const httpStatus = require("http-status");
const { Http } = require("winston/lib/winston/transports");
const { AddressDetail, Vendor, User } = require("../models");
const ApiError = require("../utils/APIError");

const queryAddressDetails = async (
  filter,
  options,
  populateFirst = null,
  populateSecond = null
) => {
  const addressDetail = await AddressDetail.paginate(
    filter,
    options,
    populateFirst,
    populateSecond
  );
  return addressDetail;
};
const getAddressDetailById = async (id) => {
  const addressDetail = await AddressDetail.findById(id).populate("shopId");
  if (!addressDetail) {
    throw new ApiError(httpStatus.ACCEPTED, "no such address Details Exist");
  }
  return addressDetail;
};

const updateAddressDetailById = async (id, body) => {
  const addressDetail = await AddressDetail.findByIdAndUpdate(id, body);
  return addressDetail;
};
const createAddressDetail = async (body) => {
  const addressDetail = await AddressDetail.create(body);
  if (body.shopId) {
    const shop = await Vendor.findByIdAndUpdate(body.shopId, {
      addressDetail: addressDetail.id,
    });
    if (!shop) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "something went wrong while updating you address details"
      );
    }
    return addressDetail;
  }
  const user = await User.findByIdAndUpdate(body.userId, {
    addressDetail: addressDetail.id,
  });
  if (!user) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "something went wrong while updating you address details"
    );
  }
  return addressDetail;
};
const deleteAddressDetailById = async (id) => {
  const addressDetail = await getAddressDetailById(id);
  const deletedAddress = await AddressDetail.findByIdAndDelete(
    addressDetail.id
  );
  return deletedAddress;
};
module.exports = {
  createAddressDetail,
  queryAddressDetails,
  updateAddressDetailById,
  getAddressDetailById,
  deleteAddressDetailById,
};

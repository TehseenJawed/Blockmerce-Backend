const httpStatus = require("http-status");
const { PaymentDetail, Vendor, User } = require("../models");
const ApiError = require("../utils/APIError");

const queryPaymentDetails = async (
  filter,
  options,
  populateFirst = null,
  populateSecond = null
) => {
  const paymentDetails = await PaymentDetail.paginate(
    filter,
    options,
    populateFirst,
    populateSecond
  );
  return paymentDetails;
};
const getPaymentDetailsById = async (id) => {
  const paymentDetails = await PaymentDetail.findById(id);
  if (!paymentDetails) {
    throw new ApiError(httpStatus.ACCEPTED, "no such payment Details Exist");
  }
  return paymentDetails;
};

const updatePaymentDetailsById = async (id, body) => {
  const paymentDetails = await PaymentDetail.findByIdAndUpdate(id, body, {
    new: true,
  });
  return paymentDetails;
};
const createPaymentDetails = async (body) => {
  const addressDetail = await PaymentDetail.create(body);
  if (body.shopId) {
    const shop = await Vendor.findByIdAndUpdate(body.shopId, {
      paymentDetail: addressDetail.id,
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
    paymentDetail: addressDetail.id,
  });
  if (!user) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "something went wrong while updating you address details"
    );
  }
  return addressDetail;
};
const deletePaymentDetailsById = async (id) => {
  const paymentDetails = await getPaymentDetailsById(id);
  await PaymentDetails.remove();
  return paymentDetails;
};
module.exports = {
  createPaymentDetails,
  queryPaymentDetails,
  updatePaymentDetailsById,
  getPaymentDetailsById,
  deletePaymentDetailsById,
};

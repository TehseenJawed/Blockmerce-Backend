const httpStatus = require("http-status");
const { paymentDetailService } = require("../services");
const catchAsync = require("../utils/catchAsync");
const pick = require("../utils/pick");

const getPaymentsDetails = catchAsync(async (req, res) => {
  const filters = pick(req.query, ["vendor", "isAvailable", "category"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const result = await paymentDetailService.queryPaymentDetails(
    filters,
    options
  );
  res.status(httpStatus.ACCEPTED).send(result);
});

const getPaymentDetails = catchAsync(async (req, res) => {
  const result = await paymentDetailService.getPaymentDetailsById(
    req.params.id
  );
  res.status(httpStatus.ACCEPTED).send(result);
});
const createPaymentDetails = catchAsync(async (req, res) => {
  const result = await paymentDetailService.createPaymentDetails(req.body);
  res.status(httpStatus.CREATED).send(result);
});
const updatePaymentDetails = catchAsync(async (req, res) => {
  const result = await paymentDetailService.updatePaymentDetailsById(
    req.params.id,
    req.body
  );
  res.status(httpStatus.ACCEPTED).send(result);
});
const deletePaymentDetails = catchAsync(async (req, res) => {
  const product = await paymentDetailService.deletePaymentDetailsById(
    req.params.id
  );
  res.status(httpStatus.ACCEPTED).send(product);
});
module.exports = {
  createPaymentDetails,
  getPaymentDetails,
  getPaymentsDetails,
  updatePaymentDetails,
  deletePaymentDetails,
};

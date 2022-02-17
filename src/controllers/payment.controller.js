const httpStatus = require("http-status");
const { paymentService } = require("../services");
const catchAsync = require("../utils/catchAsync");
const pick = require("../utils/pick");

const getPayments = catchAsync(async (req, res) => {
  const filters = pick(req.query, ["vendor", "isAvailable", "category"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const result = await paymentService.queryPayment(filters, options);
  res.status(httpStatus.ACCEPTED).send(result);
});

const getPayment = catchAsync(async (req, res) => {
  const result = await paymentService.getPaymentById(req.params.id);
  res.status(httpStatus.ACCEPTED).send(result);
});
const createPayment = catchAsync(async (req, res) => {
  const result = await paymentervice.createpayment(req.body);
  res.status(httpStatus.CREATED).send(result);
});
const updatePayment = catchAsync(async (req, res) => {
  const result = await paymentService.updatePaymentById(
    req.params.id,
    req.body
  );
  res.status(httpStatus.ACCEPTED).send(result);
});
const deletePayment = catchAsync(async (req, res) => {
  const product = await paymentService.deletePaymentById(req.params.id);
  res.status(httpStatus.ACCEPTED).send(product);
});

const stripePayment = catchAsync(async (req, res) => {
  const result = await paymentService.paymentWithStripe(req.body);
  res.status(httpStatus.ACCEPTED).send(result);
});
module.exports = {
  createPayment,
  getPayment,
  getPayments,
  updatePayment,
  deletePayment,
  stripePayment,
};

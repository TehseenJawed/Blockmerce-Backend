const httpStatus = require("http-status");
const { colourService } = require("../services");
const catchAsync = require("../utils/catchAsync");
const pick = require("../utils/pick");

const getColours = catchAsync(async (req, res) => {
  const filters = pick(req.query, ["vendor", "isAvailable", "category"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const result = await colourService.queryColour(filters, options);
  res.status(httpStatus.ACCEPTED).send(result);
});

const getColour = catchAsync(async (req, res) => {
  const result = await colourService.getColourById(req.params.id);
  res.status(httpStatus.ACCEPTED).send(result);
});
const createColour = catchAsync(async (req, res) => {
  const result = await colourService.createColour(req.body);
  res.status(httpStatus.CREATED).send(result);
});
const updateColour = catchAsync(async (req, res) => {
  const result = await colourService.updateColourById(req.params.id, req.body);
  res.status(httpStatus.ACCEPTED).send(result);
});
const deleteColour = catchAsync(async (req, res) => {
  const result = await colourService.deleteColourById(req.params.id);
  res.status(httpStatus.ACCEPTED).send(result);
});
module.exports = {
  createColour,
  getColours,
  getColour,
  updateColour,
  deleteColour,
};

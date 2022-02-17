const httpStatus = require("http-status");
const { productCondtionService } = require("../services");
const ApiError = require("../utils/APIError");
const catchAsync = require("../utils/catchAsync");
const pick = require("../utils/pick");

const getProductCondtions = catchAsync(async (req, res) => {
  const filters = pick(req.query, [
    "vendor",
    "isAvailable",
    "category",
    "size",
    "colour",
  ]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const result = await productCondtionService.queryProductCondition(
    filters,
    options
  );
  res.status(httpStatus.ACCEPTED).send(result);
});

const getProductCondtion = catchAsync(async (req, res) => {
  const result = await productCondtionService.getProductConditionById(
    req.params.id
  );
  res.status(httpStatus.ACCEPTED).send(result);
});
const createProductCondtion = catchAsync(async (req, res) => {
  const data = await JSON.parse(req.body.condition);
  console.log(data);
  if (!req.files) {
    throw new ApiError(httpStatus.BAD_REQUEST, "no images!");
  }

  const image = [];
  for (let i = 0; i < req.files.length; i++) {
    image.push(req.files[i].filename);
  }
  // req.body.image = image;
  data.image = image;
  const result = await productCondtionService.createProductCondition(data);
  res.status(httpStatus.CREATED).send(result);
});
const updateProductCondtion = catchAsync(async (req, res) => {
  const result = await productCondtionService.updateProductConditionById(
    req.params.id,
    req.body
  );
  res.status(httpStatus.ACCEPTED).send({ result: result.id });
});
const deleteProductCondtion = catchAsync(async (req, res) => {
  const product = await productCondtionService.deleteProductConditionById(
    req.params.id
  );
  res.status(httpStatus.ACCEPTED).send(product);
});
module.exports = {
  createProductCondtion,
  getProductCondtions,
  getProductCondtion,
  updateProductCondtion,
  deleteProductCondtion,
};

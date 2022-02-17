const httpStatus = require("http-status");
const { ProductCondition } = require("../models");
const ApiError = require("../utils/APIError");

const queryProductCondition = async (
  filter,
  options,
  populateFirst = "colour",
  populateSecond = null
) => {
  const productCondition = await ProductCondition.paginate(
    filter,
    options,
    populateFirst,
    populateSecond
  );
  return productCondition;
};
const getProductConditionById = async (id) => {
  const productCondition = await ProductCondition.findById(id).populate(
    "colour"
  );
  if (!productCondition) {
    throw new ApiError(httpStatus.ACCEPTED, "no such payment Details Exist");
  }
  return productCondition;
};

const updateProductConditionById = async (id, body) => {
  const productCondition = await ProductCondition.findByIdAndUpdate(id, body, {
    new: true,
  });
  return productCondition;
};
const createProductCondition = async (body) => {
  console.log(body);
  const productCondition = await ProductCondition.create(body);
  return productCondition;
};
const deleteProductConditionById = async (id) => {
  await getProductConditionById(id);
  const productConidtion = await ProductCondition.findByIdAndDelete(id);
  return productConidtion;
};
module.exports = {
  createProductCondition,
  queryProductCondition,
  updateProductConditionById,
  getProductConditionById,
  deleteProductConditionById,
};

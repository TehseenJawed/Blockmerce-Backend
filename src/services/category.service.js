const httpStatus = require("http-status");
const { Category } = require("../models");
const ApiError = require("../utils/APIError");

const queryCategory = async (
  filter,
  options,
  populateFirst = null,
  populateSecond = null
) => {
  const category = await Category.paginate(
    filter,
    options,
    populateFirst,
    populateSecond
  );
  return category;
};
const getCategoryById = async (id) => {
  const category = await Category.findById(id).populate("shopId");
  if (!category) {
    throw new ApiError(httpStatus.ACCEPTED, "no such Category Details Exist");
  }
  return category;
};

const updateCategoryById = async (id, body) => {
  const category = await Category.findByIdAndUpdate(id, body, { new: true });
  return category;
};
const createCategory = async (body) => {
  const category = await Category.create(body);
  return category;
};
const deleteCategoryDetailById = async (id) => {
  const category = await getCategoryDetailById(id);
  const deletedCategory = await Category.findByIdAndDelete(category.id);
  return deletedCategory;
};
module.exports = {
  createCategory,
  queryCategory,
  updateCategoryById,
  getCategoryById,
  deleteCategoryDetailById,
};

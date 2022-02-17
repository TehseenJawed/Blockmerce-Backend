const httpStatus = require("http-status");
const { SubCategory } = require("../models");
const ApiError = require("../utils/APIError");

const querySubCategory = async (
  filter,
  options,
  populateFirst = null,
  populateSecond = null
) => {
  const subCategory = await SubCategory.paginate(
    filter,
    options,
    populateFirst,
    populateSecond
  );
  return subCategory;
};
const getSubCategoryById = async (id) => {
  const subCategory = await SubCategory.findById(id);
  if (!subCategory) {
    throw new ApiError(
      httpStatus.ACCEPTED,
      "no such SubCategory Details Exist"
    );
  }
  return subCategory;
};

const updateSubCategoryById = async (id, body) => {
  const subCategory = await SubCategory.findByIdAndUpdate(id, body, {
    new: true,
  });
  return subCategory;
};
const createSubCategory = async (body) => {
  const subCategory = await SubCategory.create(body);
  return subCategory;
};
const deleteSubCategoryDetailById = async (id) => {
  const SubCategory = await getSubCategoryDetailById(id);
  const deletedSubCategory = await SubCategory.findByIdAndDelete(
    SubCategory.id
  );
  return deletedSubCategory;
};
module.exports = {
  createSubCategory,
  querySubCategory,
  updateSubCategoryById,
  getSubCategoryById,
  deleteSubCategoryDetailById,
};

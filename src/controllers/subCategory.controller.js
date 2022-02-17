const httpStatus = require("http-status");
const { subCategoryService } = require("../services");
const catchAsync = require("../utils/catchAsync");
const pick = require("../utils/pick");

const getSubCategories = catchAsync(async (req, res) => {
  const filters = pick(req.query, ["category", "name", "type"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const result = await subCategoryService.querySubCategory(filters, options);
  res.send(result).status(httpStatus.ACCEPTED);
});

const getSubCategory = catchAsync(async (req, res) => {
  const result = await subCategoryService.getSubCategoryById(req.params.id);
  res.send(result).status(httpStatus.ACCEPTED);
});
const createSubCategory = catchAsync(async (req, res) => {
  const result = await subCategoryService.createSubCategory(req.body);
  res.status(httpStatus.CREATED).send(result);
});
const updateSubCategory = catchAsync(async (req, res) => {
  const result = await subCategoryService.updateSubCategoryById(
    req.params.id,
    req.body
  );
  res.send(result).status(httpStatus.ACCEPTED);
});
const deleteSubCategory = catchAsync(async (req, res) => {
  const result = await subCategoryService.deleteSubCategorysById(req.params.id);
  res.send(result).status(httpStatus.ACCEPTED);
});
module.exports = {
  getSubCategories,
  getSubCategory,
  createSubCategory,
  deleteSubCategory,
  updateSubCategory,
};

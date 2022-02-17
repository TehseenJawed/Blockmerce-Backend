const httpStatus = require("http-status");
const { categoryService } = require("../services");
const catchAsync = require("../utils/catchAsync");
const pick = require("../utils/pick");

const getCategories = catchAsync(async (req, res) => {
  const filters = pick(req.query, ["vendor", "isAvailable", "category"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const result = await categoryService.queryCategory(filters, options);
  res.send(result).status(httpStatus.ACCEPTED);
});

const getCategory = catchAsync(async (req, res) => {
  const result = await categoryService.getCategoryById(req.params.id);
  res.send(result).status(httpStatus.ACCEPTED);
});
const createCategory = catchAsync(async (req, res) => {
  const category = await categoryService.createCategory(req.body);
  res.status(httpStatus.CREATED).send(category);
});
const updateCategory = catchAsync(async (req, res) => {
  const result = await categoryService.updateCategoryById(
    req.params.id,
    req.body
  );
  res.send(result).status(httpStatus.ACCEPTED);
});
const deleteCategory = catchAsync(async (req, res) => {
  const product = await categoryService.deleteCategorysById(req.params.id);
  res.send(product).status(httpStatus.ACCEPTED);
});
module.exports = {
  getCategories,
  getCategory,
  createCategory,
  deleteCategory,
  updateCategory,
};

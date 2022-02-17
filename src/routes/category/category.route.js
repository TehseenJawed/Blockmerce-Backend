const { Router } = require("express");
const { categoryController } = require("../../controllers");
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const upload = require("../../middlewares/upload");

const router = Router();

router
  .route("/")
  .post(
    categoryController.createCategory
  )
  .get(categoryController.getCategories);
router
  .route("/:id")
  .get(categoryController.getCategory)
  .delete(categoryController.deleteCategory)
  .put(categoryController.updateCategory);

module.exports = router;
    
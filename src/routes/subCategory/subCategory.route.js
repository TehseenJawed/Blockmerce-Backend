const { Router } = require("express");
const { subCategoryController } = require("../../controllers");
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const upload = require("../../middlewares/upload");

const router = Router();

router
  .route("/")
  .post(
    subCategoryController.createSubCategory
  )
  .get(subCategoryController.getSubCategories);
router
  .route("/:id")
  .get(subCategoryController.getSubCategory)
  .delete(subCategoryController.deleteSubCategory)
  .put(subCategoryController.updateSubCategory);

module.exports = router;
    
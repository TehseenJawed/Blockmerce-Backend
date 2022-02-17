const { Router } = require("express");
const { commentController } = require("../../controllers");
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const upload = require("../../middlewares/upload");

const router = Router();

router
  .route("/")
  .post(commentController.createComment)
  .get(commentController.getComments);
router
  .route("/:id")
  .get(commentController.getComment)
  .delete(commentController.deleteComment)
  .put(commentController.updateComment);

module.exports = router;

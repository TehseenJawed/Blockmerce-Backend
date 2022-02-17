const { Router } = require("express");
const { postController } = require("../../controllers");
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const upload = require("../../middlewares/upload");

const router = Router();

router
  .route("/")
  .post(
    postController.createPost
  )
  .get(postController.getPosts);

router.route("filter").get()



router
  .route("/:id")
  .get(postController.getPost)
  .delete(postController.deletePost)
  .put(postController.updatePost);

module.exports = router;

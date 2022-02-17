const { Router } = require("express");
const { replyController } = require("../../controllers");
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const upload = require("../../middlewares/upload");

const router = Router();

router
  .route("/")
  .post(replyController.createReply)
  .get(replyController.getReplies);
router
  .route("/:id")
  .get(replyController.getReply)
  .delete(replyController.deleteReply)
  .put(replyController.updateReply);

module.exports = router;

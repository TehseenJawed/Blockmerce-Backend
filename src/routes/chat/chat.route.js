const { Router } = require("express");
const { chatController, userController } = require("../../controllers");
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const upload = require("../../middlewares/upload");

const router = Router();

router.route("/").post(chatController.createChat).get(chatController.getChats);
router.route("/users").get(chatController.getUsersForChat);
router.route("/inbox").get(chatController.getUsersForInbox);
router.route("/chat/:id").get(chatController.getChatPopulated)

router
  .route("/:id")
  .get(chatController.getChat)
  .delete(chatController.deleteChat)
  .put(chatController.updateChat);

module.exports = router;

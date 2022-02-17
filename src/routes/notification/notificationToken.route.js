const { Router } = require("express");
const { notificationTokenController } = require("../../controllers");
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const upload = require("../../middlewares/upload");

const router = Router();

router
  .route("/")
  .post(
    notificationTokenController.createNotificationToken
  )
  .get(notificationTokenController.getNotificationTokens);
router
  .route("/:id")
  .get(notificationTokenController.getNotificationToken)
  .delete(notificationTokenController.deleteNotificationToken)
  .put(notificationTokenController.updateNotificationToken);

module.exports = router;
    
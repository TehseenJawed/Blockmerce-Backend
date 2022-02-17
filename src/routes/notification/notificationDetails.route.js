const { Router } = require("express");
const { notificationDetailController } = require("../../controllers");
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const upload = require("../../middlewares/upload");

const router = Router();

router
  .route("/")
  .post(notificationDetailController.createNotificationDetail)
  .get(notificationDetailController.getNotificationDetails);

router
  .route("/byUser")
  .get(notificationDetailController.getNotificationDetailByUser);

router
  .route("/:id")
  .get(notificationDetailController.getNotificationDetail)
  .delete(notificationDetailController.deleteNotificationDetail)
  .put(notificationDetailController.updateNotificationDetail);

module.exports = router;

const { Router } = require("express");
const { notificationController } = require("../../controllers");
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");

const router = Router();

router.route("/").post(notificationController.getNotification);
router.route("/create-room").post(notificationController.createRoom);
router.route("/join-room").get(notificationController.joinRoom);
router.route("/getToken").get(notificationController.getToken);

// router.route("/show-recording").post(notificationController.showRecording);
// router.route("/get-room").get(notificationController.getRoom);
// router.route("/get-recording").post(notificationController.getRecording);

module.exports = router;

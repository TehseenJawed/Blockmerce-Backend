const express = require("express");
const vendorController = require("../../controllers/vendor.controller.js");
const upload = (require = require("../../middlewares/upload"));
const router = express.Router();

router
  .route("/")
  .get(vendorController.getVendors)
  .post(upload.single("profilePicture"), vendorController.createVendor);

router
  .route("/followShop/:id")
  .post(vendorController.followShop)
  .get(vendorController.unfollowShop);

  router
  .route("/unfollowShop/:id")
  .post(vendorController.unfollowShop)


router
  .route("/:id")
  .get(vendorController.getVendor)
  .delete(vendorController.deleteVendor)
  .patch(upload.single("profilePicture"), vendorController.updateVendor);

module.exports = router;

const { Router } = require("express");
const { wishlistController } = require("../../controllers");
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const upload = require("../../middlewares/upload");

const router = Router();

router
  .route("/")
  .post(wishlistController.createWishlist)
  .get(wishlistController.getWishlists);

router
  .route("/delete")
  .delete(wishlistController.deleteWishlistByUserAndProduct);

router
  .route("/:id")
  .get(wishlistController.getWishlist)
  .delete(wishlistController.deleteWishlist)
  .put(wishlistController.updateWishlist);

module.exports = router;

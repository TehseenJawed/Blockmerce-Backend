const { Router } = require("express");
const { cartController } = require("../../controllers");
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const upload = require("../../middlewares/upload");
const cartValidation = require("../../validations/cart.validation");
const router = Router();

router
  .route("/")
  .post(
    // validate(cartValidation.createCart)
    cartController.createCart
  )
  .get(cartController.getCarts);

router.route("/user/:id").get(cartController.getCartByUser);
router.route("/updateCart/:id").patch(
  // validate(cartValidation.updateCartOnlyById),
  cartController.updateCartOnly
);

router
  .route("/:id")
  .get(cartController.getCart)
  .delete(cartController.deleteCart)
  .patch(cartController.updateCart);

module.exports = router;

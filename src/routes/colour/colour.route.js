const { Router } = require("express");
const { colourController } = require("../../controllers");
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const upload = require("../../middlewares/upload");

const router = Router();

router
  .route("/")
  .post(colourController.createColour)
  .get(colourController.getColours);
router
  .route("/:id")
  .get(colourController.getColour)
  .delete(colourController.deleteColour)
  .put(colourController.updateColour);

module.exports = router;

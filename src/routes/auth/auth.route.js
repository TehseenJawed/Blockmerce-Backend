const express = require("express");
const { authController } = require("../../controllers");
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const authValidation = require("../../validations/auth.validation");

const router = express.Router();
router.post("/loginWithGoogle", authController.loginWithGoogle);
router.post("/loginWithFacebook", authController.loginWithFacebook);
router.post("/login", authController.login);

module.exports = router;

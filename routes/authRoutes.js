const express = require("express");
const router = express.Router();
const authController = require("../controller/auth");


router.get("/authgoogle", authController.authGoogle);
router.get("/authgoogle/callback", authController.authGoogleCallback);
router.get("/auth-me",authController.authMe);
router.post("/logout", authController.logout);
module.exports = router;
const express = require("express");
const router = express.Router();
const authController = require("../controller/auth");


router.post("/auth-receiver", authController.authGoogle);
module.exports = router;
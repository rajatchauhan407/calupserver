const express = require("express");
const router = express.Router();
const userController = require("../controller/user");

router.post("/login",userController.userAuthenticationLogin);
router.post("/signup", userController.createUser);
module.exports = router;


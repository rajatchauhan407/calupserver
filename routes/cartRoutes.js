const express = require("express");
const router = express.Router();

const cartController = require('../controller/cart');

router.post('/cart', cartController.getCartData);

module.exports = router;
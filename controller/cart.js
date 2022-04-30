const Cart = require('../models/cart');



exports.getCartData = (req, res, next)=>{
    const {id,title,price,quantity,totalPrice} = req.body.items[0];

    console.log(req.body.items);
    const cart = new Cart({
        id:id,
        title:title,
        price:price,
        quantity:quantity,
        totalPrice:totalPrice
    });
    cart.save().then(result => {
        res.status(201).json({
            message:"Cart saved"
        })
    }).catch(error => {
        res.status(501).json({
            message: "Internal Server Error"
        });
    });
};
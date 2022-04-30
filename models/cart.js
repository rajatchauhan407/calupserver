const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    id:String,
    title:String,
    price:Number,
    quantity:Number,
    totalPrice:Number
});

module.exports = mongoose.model('Cart', cartSchema);
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const userSchema = new Schema({
    userEmail:{type: String,
               required:true},
    userPassword:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User',userSchema);
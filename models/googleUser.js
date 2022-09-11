const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const googleUserSchema = new Schema({
    googleId:{type:String},
    email:{type:String, required:true},
    verified_email:{type:Boolean},
    name:{type:String},
    given_name:{type:String},
    family_name:{type:String},
    picture:{type:String},
    locale:{type:String},
    userPassword:{type:String},
    dateOfJoining:{type:Date},
    isActive:{type:Boolean, required:true},
    isGoogleUser:{type:Boolean, required: true}
});

module.exports = mongoose.model('GoogleUser',googleUserSchema);
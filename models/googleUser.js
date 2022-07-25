const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const googleUserSchema = new Schema({
    googleId:{type:String,require:true},
    email:{type:String, required:true},
    verified_email:{type:Boolean, required:true},
    name:{type:String, required:true},
    given_name:{type:String, required:true},
    family_name:{type:String, required:true},
    picture:{type:String, required:true},
    locale:{type:String, required:true}
});

module.exports = mongoose.model('GoogleUser',googleUserSchema);
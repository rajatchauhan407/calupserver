const User = require("../models/user");
const { createHmac } = require('crypto');
var validator = require('validator');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config();

// function to verify if user Exists
function verifyUser(email, password){
        const promise = new Promise((resolve,reject) => {
                const hashedpassword =  createHmac('sha256', process.env.SECRETKEY).update(password).digest('hex');
        User.findOne(
                {
                        userEmail:email
                }
        ).then((result) => {
               if(result){
                //        console.log(result);
                       resolve(result);
               }else{
                       reject("Email does not exist !");
               }
        })
        });        
        return promise;
}

// function to authenticate users
exports.userAuthenticationLogin = (req, res, next)=>{
        const email = req.body.email;   
        const PWDhash = createHmac('sha256', process.env.SECRETKEY).update(req.body.
                password).digest('hex');
        
        verifyUser(req.body.email, PWDhash).then(
                (result)=>{
                        // console.log(result);
                        if(result.userPassword === PWDhash){
                              const token = jwt.sign({
                                      email:result.userEmail
                              },
                              process.env.JWT_KEY,
                              {
                                      expiresIn: "24h"
                              }
                              );
                              return token;
                        }else{
                                throw "Password Doesn't Match";
                        }
                }
        ).then((token) => {
                // console.log(token);
                res.status(201).json({
                        token:token,
                        expiresIn: 2*60*1000
                });
        }).catch((error=>{
                // console.log(error);
                res.status(501).json({
                        message: error
                })
        }));
};
// controller to create user
exports.createUser =async (req, res, next) => {
        const email = req.body.email;
        const password = req.body.password;
        if(validator.isEmail(email) && validator.isStrongPassword(password,{
                minLength:8,
                minLowercase: 1,
                minUppercase: 1, 
                minNumbers: 1, 
                minSymbols: 1
        })){   
                if(email){
                        const result = await User.findOne({
                                email:email
                        });
                        if(result){
                                res.status(501).json({
                                        message: " User Already Exists !"
                                });
                                return ;
                        }
                }
                const PWDhash = createHmac('sha256', process.env.SECRETKEY).update(password).digest('hex');
                const user = new User(
                        {
                                userEmail: email,
                                userPassword: PWDhash  
                        }
                );
                user.save().then((result) => {
                        res.status(201).json({
                                message:" User Saved !"
                        })
                }).catch((error)=>{
                        res.status(501).json({
                                message:" Internal Server Error!"
                        })
                });
        }else{
                res.status(501).json({
                        message:"Validation Failed !!!"
                });
        }
        
}


// duplicacy of email ------ yet to be completed =-------
const checkDuplicateEmail = (email)=>{
        // return User.findOne({
        //         email:email
        // })?true:false;

        User.findOne({
                email:email
        }).then(result => {
                if(result){
                        return true;
                }else{
                        return false;
                }
        });
}


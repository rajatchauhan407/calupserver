const User = require("../models/user");
const { createHmac } = require("crypto");
var validator = require("validator");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const GoogleUser = require("../models/googleUser");
var JWT = require("jsonwebtoken");
const {generateLinkCode} = require('../factory/generateLink');
const {sendingEmail} = require('../factory/send-email');
dotenv.config();

// function to verify if user Exists
function verifyUser(email, password) {
  const promise = new Promise((resolve, reject) => {
    const hashedpassword = createHmac("sha256", process.env.SECRETKEY)
      .update(password)
      .digest("hex");
    GoogleUser.findOne({
      email: email,
    }).then((result) => {
      if (result) {
        //        console.log(result);
        resolve(result);
      } else {
        reject("Email does not exist !");
      }
    });
  });
  return promise;
}

// function to generate jwt
const generateToken = (email, verified_email = true) => {
  if (verified_email) {
    const token = JWT.sign(
      {
        email: email,
      },
      process.env.JWT_KEY,
      {
        expiresIn: "24h",
      }
    );
    return token;
  } else {
    throw "Email not verified !!!";
  }
};

// function to authenticate users
exports.userAuthenticationLogin = (req, res, next) => {
  const email = req.body.email;
  const PWDhash = createHmac("sha256", process.env.SECRETKEY)
    .update(req.body.password)
    .digest("hex");

  verifyUser(email, PWDhash)
    .then((result) => {
      // console.log(result);
      if (result.userPassword === PWDhash && result.isActive === true && result.isGoogleUser === false) {
        const token = jwt.sign(
          {
            email: result.email,
          },
          process.env.JWT_KEY,
          {
            expiresIn: "24h",
          }
        );
        return token;
      } else {
        throw "There is some error! Either the email is associated with us or Password doesn't match! ";
      }
    })
    .then((token) => {
      // console.log(token);
      res.cookie('token',token,{
        maxAge:12000000,
        httpOnly:true,
        secure:true
      }).json({
        data:{
          message:"User Authenticated"
        }
      });
    })
      .catch((error) => {
      console.log(error);
      res.status(501).json({
        message: error,
      });
    });
};
// get current date of joining
function dateOfJoining() {
  const seconds = Date.now();
  const date = new Date(seconds);
  return date;
}

// controller to create user
exports.createUser = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email, password);
  if (
    validator.isEmail(email) &&
    validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
  ) {
    if (email) {
      const result = await GoogleUser.findOne({
        email: email,
      });
      if (result) {
        res.status(501).json({
          message: " User Already Exists !",
          // error:error
        });
        return;
      }
    }
    const PWDhash = createHmac("sha256", process.env.SECRETKEY)
      .update(password)
      .digest("hex");

    const currDate = dateOfJoining();

    const user = new GoogleUser({
      email: email,
      userPassword: PWDhash,
      dateOfJoining: currDate,
      isActive: false,
      isGoogleUser: false
    });

    const token = generateToken(email, true);
    // console.log(email, password);

    user
      .save()
      .then((result) => {
        res.json({
                data:{message: "We have sent an verification email. Please confirm to verify your account"}
        });
        const link = generateLinkCode(email,5);
        sendingEmail(email,link);
        // res
        //   .cookie("token", token, {
        //     maxAge: 12000000,
        //     httpOnly: true,
        //     secure: true,
        //   })
        //   .status(201).json({
        //         data:{
        //                 message:"User Saved"
        //         }
        //   });
      })
      .catch((error) => {
        console.log(error);
        res.status(501).json({
          message: " Internal Server Error!",
          error: error,
        });
      });
    // console.log(token);
    // console.log(email, password);
  } else {
    res.status(501).json({
      message: "Validation Failed !!!",
    });
  }
};

// duplicacy of email ------ yet to be completed =-------
const checkDuplicateEmail = (email) => {

  User.findOne({
    email: email,
  }).then((result) => {
    if (result) {
      return true;
    } else {
      return false;
    }
  });
};

// function to confirm email
exports.confirmEmail = async (req, res, next)=>{
  const options = {
    ignoreExpiration: true
  }
      const token = req.query.iq;
      try{
           const decodedToken = JWT.verify(token,process.env.JWT_EMAIL_CONFIRMATION_KEY,options);
           const email = decodedToken.email;
           const filter = {
            email: email
           };
           const update = {
            isActive:true
           }
           GoogleUser.findOneAndUpdate(filter,update).then(result =>{
            console.log(result);
            if(result){
                res.redirect('http://localhost:3000/login');
            }
           });
          }catch(error){
            console.log(error);
            res.status(500).json({
              message:"An Error Has Occured! Unexpected Problem!"
            });
      }
}
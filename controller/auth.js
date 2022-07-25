const {google} = require('googleapis');
const User = require('../models/user');
const GoogleUser = require('../models/googleUser');
var JWT = require('jsonwebtoken');
const dotenv = require('dotenv');
const url = require('url');
const googleUser = require('../models/googleUser');
const axios = require('axios').default;
dotenv.config();

// function to find and create user(if user is new)
async function findAndCreateUser(userDetails){
  try{
    if(userDetails.id){
      try{
        const userData = await GoogleUser.findOne({
          googleId:userDetails.id
        });
        if(userData){
          console.log("From MongoDB");
          return userData;
        }
        if(!userData){
          const {id,email,verified_email,name,given_name, family_name,picture,locale} = userDetails;
          const newUser = new GoogleUser({
              googleId: id,
              email,
              verified_email,
              name,
              given_name,
              family_name,
              picture,
              locale
          });
         await newUser.save();
         console.log("From Google User");
         return newUser;
        }
      }catch(err){
        console.log(err);
        return err;
      }
    }
  }catch(err){
    console.log(err);
    return err;
  } 
}

// function to generate jwt
function generateToken(email, verified_email){
  if(verified_email){
    const token = JWT.sign({
      email:email
      },
    process.env.JWT_KEY,
    {
      expiresIn: "24h"
    }
    );
    return token;
   }else{
    throw "Email not verified !!!"
   }
}

function verifyToken(token){
    const decodedToken = JWT.verify(token,process.env.JWT_KEY);
    return decodedToken;
}
exports.authGoogle = (req, res, next)=>{
  const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    "http://localhost:9000/authgoogle/callback"
  );
  const scopes = ['https://www.googleapis.com/auth/userinfo.email',
                  'https://www.googleapis.com/auth/userinfo.profile'];

  const authorizationUrl = oauth2Client.generateAuthUrl({
                    // 'online' (default) or 'offline' (gets refresh_token)
                    access_type: 'offline',
                  
                    // If you only need one scope you can pass it as a string
                    scope: scopes,
                    include_granted_scopes: true
                  });
                  res.redirect(authorizationUrl);
}
exports.authGoogleCallback = async (req, res, next)=>{
  const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    "http://localhost:9000/authgoogle/callback"
  );
  // console.log(req.url);
  if (req.url.startsWith('/authgoogle/callback')) {
    // Handle the OAuth 2.0 server response
    let q = url.parse(req.url, true).query;
    // Get access and refresh tokens (if access_type is offline)
    let { tokens } = await oauth2Client.getToken(q.code);
    oauth2Client.setCredentials(tokens);
    const userInfo = await axios.get(`https://www.googleapis.com/oauth2/v2/userinfo`,{
      headers:{
        'Authorization': `Bearer ${tokens.access_token}`
      }
    }
    ).then(res => res.data);
    console.log(userInfo);
    // user will have all the user data 
    const user = await findAndCreateUser(userInfo);
    // function will generate json web token for authorization
    const token = generateToken(user.email, user.verified_email);
    res.cookie('token',token,{
      maxAge:1200000,
      httpOnly:true,
      secure:false
    }).redirect(`http://localhost:3000/home`);
  }else{
    console.log("It is not starting with oauth2callback");
  }
}
exports.authMe = async (req,res, next) => {
  if(req.cookies.token){
    const decodedToken = JWT.verify(req.cookies.token,process.env.JWT_KEY);
    const userData = await googleUser.findOne({
      email:decodedToken.email
    });
    const {email, name, given_name} = userData;
    res.set({'Access-Control-Allow-Credentials':true}).status(201).json({
      email,name,given_name
    });
  }else{
    res.status(404).send({
      error: "User Not Found"
    })
  }
  
} 
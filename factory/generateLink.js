const dotenv = require("dotenv");
const JWT = require("jsonwebtoken");
dotenv.config();
// function to generate jwt
const generateToken = (email, expirationTime) => {
      const token = JWT.sign(
        {
          email: email,
        },
        process.env.JWT_EMAIL_CONFIRMATION_KEY,
        {
          expiresIn: `${expirationTime}min`,
        }
      );
      return token;
  };
function generateLinkCode(email, expirationTime){
    const token = generateToken(email, expirationTime);
    return `<a href="http://localhost:9000/confirm?iq=${token}">Verify Your Email</a>`
}
// console.log(generateLinkCode('rajatchauhan407@gmail.com',5));
module.exports = {generateLinkCode};
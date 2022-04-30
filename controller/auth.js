const User = require('../models/user');
var jwt = require('jsonwebtoken');
const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = '357888347936-t044jniqpmrc0ubjkgrn4h50vggi38uv.apps.googleusercontent.com'
exports.authGoogle = (req, res, next)=>{
    const token = req.body.tokenId;
    const client = new OAuth2Client(CLIENT_ID);
async function verify() {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();
  const userid = payload['sub'];
  // If request specified a G Suite domain:
  // const domain = payload['hd'];
  console.log(payload);
}
verify().catch(console.error);
}
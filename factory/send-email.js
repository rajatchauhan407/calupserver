const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();


async function sendingEmail(email,link){
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.USEREMAIL,
      pass: process.env.PASSWORD,
    }
    });
    const mailConfigurations = {
      from: 'calup.connect@gmail.com',
      to: email,
      subject: 'Confirmation Email',
      text: `Thank You for using Calup. This is a confirmation email. To confirm your email please click on link : ${link}`,
      html:`<h1> Confirmation Email From Calup</h1>
            <p>Please Click on the link below to confirm you email</p>: 
            ${link}`
            
    };
    
    try{
      transporter.sendMail(mailConfigurations, function(error, info){
        if (error) throw Error(error);
        console.log('Email Sent Successfully');
        console.log(info);
        return info;
      });
    }catch(error){
        // return error;
        console.log(error);
        return "An error occured!"
    }
    
}

module.exports = {sendingEmail};

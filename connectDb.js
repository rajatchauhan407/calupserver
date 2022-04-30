const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

async function connectToMongo(){
  const result = await mongoose.connect('mongodb+srv://rajat_veggi1304:' + process.env.MONGO_ATLAS_PW + '@veggies.znzgp.mongodb.net/calup?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true}).then(
        result=>{
            console.log("Project Calup connected");
            // return "Project Silver Connected"
        }
    ).catch(error=>{
        console.log(error);
        return error;
    });
    return result;
}
module.exports={connectToMongo};
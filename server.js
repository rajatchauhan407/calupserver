const express = require("express");
const app = express();
const PORT = 9000;
const {connectToMongo} = require("./connectDb");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const cartRoutes = require("./routes/cartRoutes");
const questionRoutes = require("./routes/questionRoutes");
const cookieParser = require('cookie-parser');
const {URL, URL_FRONTEND, URL_FRONTEND_DEV} = require('./config/api');
connectToMongo(); 
console.log(process.env.NODE_ENV)
app.set("trust proxy", 1);
app.use(express.json({extended:false}));
app.use(express.urlencoded({extended:false}));
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin", process.env.NODE_ENV === "development" ? URL_FRONTEND_DEV : URL_FRONTEND);
    res.setHeader("Access-Control-Allow-Headers","Origin,X-Requested-With, Content-Type, Accept,Authorization");
    res.setHeader("Access-Control-Allow-Methods","GET,POST,PATCH,DELETE,OPTIONS");
    res.setHeader("Access-Control-Allow-Credentials","true")
    next();
});
app.use(cookieParser());
// console.log(userRoutes.stack[0].route.path);

app.get('/home',(req, res)=>{
    console.log(req.body);
    res.json({
        data:"Received Your request Buddy"
    });
});
app.use(userRoutes);
app.use(authRoutes);
app.use(cartRoutes);
app.use(questionRoutes);
app.listen(process.env.port || PORT ,()=>{console.info(`Server started at ${PORT}`)});

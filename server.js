const express = require("express");
const app = express();
const PORT = 9000;
const {connectToMongo} = require("./connectDb");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const cartRoutes = require("./routes/cartRoutes");
connectToMongo();
app.use(express.json({extended:false}));
app.use(express.urlencoded({extended:false}));
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.setHeader("Access-Control-Allow-Headers","Origin,X-Requested-With, Content-Type, Accept,Authorization");
    res.setHeader("Access-Control-Allow-Methods","GET,POST,PATCH,DELETE,OPTIONS");
    next();
});

app.use(userRoutes);
app.use(authRoutes);
app.use(cartRoutes);
app.listen(PORT,()=>{console.info(`Server started at ${PORT}`)});

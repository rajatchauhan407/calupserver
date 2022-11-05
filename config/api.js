let URL;
let URL_FRONTEND;
if(process.env.NODE_ENV === "development"){
    URL = "http://localhost:9000";
    URL_FRONTEND = "http://localhost:3000";
}else if(process.env.NODE_ENV === "production"){
    URL = "Calupbackend-env.eba-wxkj9sdg.us-east-1.elasticbeanstalk.com";
    URL_FRONTEND = "Calupfrontend-env.eba-ghpdv5nv.us-east-1.elasticbeanstalk.com ";
}

module.exports = {URL, URL_FRONTEND};
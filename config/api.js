let URL;
let URL_FRONTEND;
if(process.env.NODE_ENV === "development"){
    URL = "http://localhost:9000";
    URL_FRONTEND = "http://localhost:3000";
}else if(process.env.NODE_ENV === "production"){
    URL = "http://calupbackend-env.eba-wxkj9sdg.us-east-1.elasticbeanstalk.com";
    URL_FRONTEND = "http://calupfrontend-env.eba-ghpdv5nv.us-east-1.elasticbeanstalk.com";
}

module.exports = {URL, URL_FRONTEND};
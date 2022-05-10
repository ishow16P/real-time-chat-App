const mongoose = require('mongoose');
const envService = JSON.parse(process.env.service);
const {conn_type, ip, port ,path} = envService.mongodb.local;
let url_mongoDB = `${conn_type}://${ip}${port ? ':'+ port: ''}${path}`;

mongoose.Promise = global.Promise;

mongoose.connect(url_mongoDB, async error =>{
    if(error){
        let db = mongoose.connection;
        console.log(error);
        db.on("error",console.error.bind(console, "MogoDb connection error:"))
    }else{
        console.log("MogoDB URL:"+ url_mongoDB);
        console.log("MogoDB connection success ...");
    }
})
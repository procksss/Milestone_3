const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/Milestone3"

const ConnectMongo=()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("connected to mongoose");
    })

} 

module.exports=ConnectMongo;
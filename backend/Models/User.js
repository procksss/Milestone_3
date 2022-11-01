const mongoose =  require('mongoose'); //ES6
const { Schema } = mongoose;
//defining a new schema
const UserSchema = new Schema({
firstname: { type: String, required: true },
lastname: { type: String, required: true },
address: { type: String, required: true },
email: { type: String, required: true, unique:true },
password: { type: String, required: true },
Isadmin: {type: Boolean,required: true},
date: { type: Date, default: Date.now },

});
//creating user model in mongo server 
const User = mongoose.model('user', UserSchema);
module.exports = User;
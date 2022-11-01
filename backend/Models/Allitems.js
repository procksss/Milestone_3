const mongoose =  require('mongoose');
const { Schema } = mongoose;
//defining a new schema
const AllitemsSchema = new Schema({
medicineid: { type: Number, required: true },
medicinename: { type: String, required: true },
price: { type: Number, required: true },
tag: { type: String, default: "General" },
date: { type: Date, default: Date.now },
});
//creating user model in mongo server 
const Allitems = mongoose.model('allitems', AllitemsSchema);
module.exports = Allitems;
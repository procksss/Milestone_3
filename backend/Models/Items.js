const mongoose =  require('mongoose');
const { Schema } = mongoose;
//defining a new schema
const ItemsSchema = new Schema({
user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
medicineid: { type: Number, required: true },
medicinename: { type: String, required: true },
price: { type: Number, required: true },
tag: { type: String, default: "General" },
date: { type: Date, default: Date.now },
});
//creating user model in mongo server 
const Items = mongoose.model('items', ItemsSchema);
module.exports = Items;
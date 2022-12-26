const mongoose = require('mongoose')
//schema
const admission = new mongoose.Schema({
    name: String,
    email: String,
    password:String,
    number:Number,
    rank:Number
});
const Admission = mongoose.model('Admission', admission);
module.exports = Admission
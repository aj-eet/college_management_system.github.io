
const mongoose = require('mongoose')
//schema
const facultySchema = new mongoose.Schema({
    name: String,
    email: String,
    password:String,
    number: Number,
    department:String,
    
});
const Faculty = mongoose.model('Faculty', facultySchema);

module.exports = Faculty

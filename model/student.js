
const mongoose = require('mongoose')
//schema
const studentSchema = new mongoose.Schema({
    name: String,
   email:String,
   password:String,
   roll:String,
   number:Number,
   branch:String
});
const Student = mongoose.model('Student', studentSchema);

module.exports = Student

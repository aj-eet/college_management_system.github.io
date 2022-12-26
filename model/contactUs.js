const mongoose = require('mongoose')
//schema
const contactUs = new mongoose.Schema({
    name: String,
    email: String,
    number: String,
    address: String,
    message: String
});
const Contact = mongoose.model('Contact', contactUs);
module.exports = Contact
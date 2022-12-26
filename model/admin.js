const mongoose = require('mongoose')
//schema
const AdminSchema = new mongoose.Schema({
    name: String,
    department: String,
    email: String,
    password: String
});
const Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin

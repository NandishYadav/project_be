const mongoose = require('mongoose');

const userSchema = new  mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    phone_number: String,
    password: String,
});


module.exports = mongoose.model('users', userSchema);
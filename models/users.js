const mongoose = require('mongoose');

const userSchema = new  mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone_number: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
},
{
    timestamps: true
});


module.exports = mongoose.model('users', userSchema);
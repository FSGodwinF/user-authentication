const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {type: String, required: true, minLength: 6, maxLength: 255},
    email: {type: String, required: true,minLength: 6, maxLength: 255 },
    password: {type: String, required: true, minLength: 8, maxLength: 1024},
    date: {type: Date, default: Date.now}
});


module.exports = mongoose.model('User', userSchema);
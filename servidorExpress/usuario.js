const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    user: String,
    pass: String
})

module.exports = mongoose.model('usuarios', UserSchema);
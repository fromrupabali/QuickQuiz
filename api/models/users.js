const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {type : String},
    password: {type : String},
    googleId: {type: String}
});

module.exports = mongoose.model('User', userSchema);
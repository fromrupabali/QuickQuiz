const mongoose = require('mongoose');

const quizSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true},
    description: { type: String, required: true},
    catagory: { type: String, required: true},
    quizImage: { type: String, required: true},
    author: { type: mongoose.Schema.Types.ObjectId, ref:'User', required: true }
});

module.exports = mongoose.model('Quiz', quizSchema);
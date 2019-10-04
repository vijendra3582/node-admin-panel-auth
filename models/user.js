var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
    },
    location: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

var User = mongoose.model('User', userSchema);

module.exports = User;
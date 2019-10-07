var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        set: toLower,
        required: true
    },
    email: {
        type: String,
        set: toLower,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
    },
    location: {
        type: String,
    }

}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

var User = mongoose.model('User', userSchema);

function toLower(str) {
    return str.toLowerCase();
}

module.exports = User;
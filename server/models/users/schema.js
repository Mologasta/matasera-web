const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique : true,
        required: true
    },
    email: {
        type: String,
        unique : true,
        required : true
    },
    password: {
        type: String,
        required: true
    },
    salt: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

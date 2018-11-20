const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = new Schema({
    path: {
        type: String,
        required: true,
    },
    lat: {
        type: String,
        required: false,
    },
    lng: {
        type: String,
        required: false,
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

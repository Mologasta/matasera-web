const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = new Schema({
    path: {
        type: String,
        required: true,
    },
    location: {
        type: { type: String },
        coordinates: [Number],
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

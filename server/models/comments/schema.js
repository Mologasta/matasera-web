const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = new Schema({
    text: {
        type: String,
        required: true,
    },
    imageId: {
        type: Schema.Types.ObjectId,
        required: true,
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

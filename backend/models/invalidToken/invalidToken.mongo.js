const mongoose = require('mongoose');

const InvalidToken = new mongoose.Schema({
    token: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
})

const invalidToken = mongoose.model('invalidToken', InvalidToken);
module.exports = invalidToken;
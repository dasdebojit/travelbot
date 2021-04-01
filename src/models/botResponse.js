const mongoose = require('mongoose');
require('mongoose-regexp')(mongoose);

const botResponseSchema = new mongoose.Schema({
    tag: {
        type: String,
        trim: true,
        required: true
    },
    response: []
});

const BotResponse = mongoose.model('botResponse', botResponseSchema);
module.exports = BotResponse;
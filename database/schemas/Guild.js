const mongoose = require('mongoose')

module.exports = mongoose.model('Guild', new mongoose.Schema({
    id: { type: String }, // Id of the guild
    registeredAt: { type: Number, default: Date.now() }, // Date at which the bot created the first schema
}))
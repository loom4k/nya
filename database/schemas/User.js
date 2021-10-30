const mongoose = require('mongoose')

module.exports = mongoose.model('User', new mongoose.Schema({
    id: { type: String }, // Id of the user
    registeredAt: { type: Number, default: Date.now() }, // Date at which the bot created the first schema

    currency: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    cookname: { type: String, default: 'Cat Cook' },
    restaurantname: { type: String, default: 'Nyao!\'s restaurant' }
}))
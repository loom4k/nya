const mongoose = require('mongoose')
const config = require('./../config.json')
const { mongodb } = require('./variables')
const logger = require('./logger')

module.exports = {
    init: () => {
        const dbOptions = {
            keepAlive: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        }
    }
}
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
        }

        if (!config.mongodb_url) logger.error(`Database failed to load - Required environnement variable "mongodb_url" is not set.`, { label: 'Database' })
        mongoose.connect(mongodb, dbOptions)
            .then(() => {
                logger.info('Server connected to the MongoDB Database', { label: 'Database' })
            })
            .catch(e => {
                logger.error(e.message, { label: 'Database' })
                this.database = null
            })

        mongoose.Promise = global.Promise

        mongoose.connection.on('err', err => {
            logger.error(`Mongoose connection error: ${err.stack}`, { label: 'Database' })
        })

        mongoose.connection.on('disconnected', () => {
            logger.error(`Mongoose connection lost`, { label: 'Database' })
        })
    }
}
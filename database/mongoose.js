const mongoose = require('mongoose')
const config = require('./../config.json')
const { mongodb } = require('../utils/variables')
const guildSchema = require('./schemas/Guild')
const userSchema = require('./schemas/User')
const logger = require('../utils/logger')

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

module.exports.fetchGuild = async function(key) {
    let guildDB = await guildSchema.findOne({ id: key })

    if (guildDB) {
        return guildDB
    } else {
        guildDB = new guildSchema({
            id: key,
            registeredAt: Date.now(),
            lang: 'en',
        })
        await guildDB.save().catch(err => console.log(err))
        return guildDB
    }
}

module.exports.fetchUser = async function(key) {
    let userDB = await userSchema.findOne({ id: key })

    if (userDB) {
        return userDB
    } else {
        userDB = new userSchema({
            id: key,
            registeredAt: Date.now(),
        })
        await userDB.save().catch(err => console.log(err))
        return userDB
    }
}
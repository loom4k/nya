const config =
require('dotenv').config()

module.exports = { config: require('../config.json'), token: process.env.TOKEN, mongodb: config.mongodb_url, datadog: true }
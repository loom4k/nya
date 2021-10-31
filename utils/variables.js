const config = require('../config.json')
require('dotenv').config()
let token
let mongodb

if (config.dev) {
    token = process.env.TOKEN
    mongodb = config.mongodb_url
} else if (!config.dev) {
    token = process.env.TOKEN
    mongodb = config.mongodb_url
}

module.exports = { config, token, mongodb }
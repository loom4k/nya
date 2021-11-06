const config = require('../config.json')
require('dotenv').config()
let token
let mongodb

if (config.dev) {
    token = process.env.TOKEN
    mongodb = config.mongodb_url
    topgg = process.env.TOPGG_TOKEN
} else if (!config.dev) {
    token = process.env.TOKEN
    mongodb = config.mongodb_url
    topgg = process.env.TOPGG_TOKEN
}

module.exports = { config, token, mongodb }
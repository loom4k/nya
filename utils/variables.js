const config = require('../config.json')
require('dotenv').config()

let token
let mongodb
let datadog

token = process.env.TOKEN
mongodb = config.mongodb_url
topgg = process.env.TOPGG_TOKEN
datadog = true


module.exports = { config, token, mongodb, datadog }
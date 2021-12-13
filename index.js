const NyaClient = require('./Client.js')
const config = require('./config.json')

const Nya = new NyaClient(config)

const client = Nya

Nya.start()
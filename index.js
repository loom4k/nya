const NyaClient = require('./Client.js')
const config = require('./config.json')

const Nya = new NyaClient(config)
const Dashboard = require('./dashboard/index')

const client = Nya

Nya.start()
Dashboard(client)
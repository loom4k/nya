const NyaClient = require('./Client.js')
const config = require('./config.json')

const Nya = new NyaClient(config)

const color = require('./data/colors')
const emoji = require('./data/emoji.js')

Nya.color = color
Nya.emoji = emoji

let client = Nya

Nya.react = new Map()
Nya.fetchforguild = new Map()

Nya.start()
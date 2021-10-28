const WaveClient = require('./Client.js')
const config = require('./config.json')

const Wave = new WaveClient(config)

const color = require('./data/colors')
const emoji = require('./data/emoji.js')

Wave.color = color
Wave.emoji = emoji

let client = Wave

Wave.react = new Map()
Wave.fetchforguild = new Map()

Wave.start()
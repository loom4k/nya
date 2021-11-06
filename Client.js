// Importing dependencies
const { Client, Collection, WebhookClient } = require('discord.js')
const Discord = require('discord.js')
const Util = require('./structures/Util')
const config = require('./config.json')
const logger = require('./utils/logger')
const { token, topgg } = require('./utils/variables')
const Chatbot = require("discord-chatbot")
const { AutoPoster } = require('topgg-autoposter')

module.exports = class NyaClient extends Client {
    constructor(options = {}, senty) {
        super({
            partials: ['MESSAGE', 'CHANNEL', 'GUILD_MEMBER', 'REACTION', 'USER'],
            cacheGuilds: true,
            fetchAllMembers: true,
            disableMentions: 'everyone',
            shardCount: 1,
            intents: [
                Discord.Intents.FLAGS.GUILDS,
                Discord.Intents.FLAGS.GUILD_MESSAGES,
                Discord.Intents.FLAGS.GUILD_MEMBERS,
                Discord.Intents.FLAGS.GUILDS
            ],
        })

        this.validate(options)
        this.partials = ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBER', 'USER']
        this.slashCommands = new Collection()
        this.events = new Collection()
        this.Timeout = new Collection()
        this.utils = require('./utils/utils')
        this.utils = new Util(this)
        this.Chatbot = new Chatbot({ name: "Nya", gender: "cat" })
        this.config = require('./config.json')
        this.emoji = require('./data/emoji')
        this.colors = require('./data/colors')
        this.Database = require('./database/mongoose')
    }

    validate(options) {
        if (typeof options !== 'object') throw new TypeError('Options should be a type of Object.')

        if (!token) throw new Error('You must pass in the token for the client.')
        this.token = token

        if (!options.mongodb_url) throw new Error('You must pass in the MongoDB Url for the client.')
    }

    async start(token = this.token) {
        /*AutoPoster('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg5NDcyOTI4ODMzNzczMTY0NSIsImJvdCI6dHJ1ZSwiaWF0IjoxNjM2MTUyMzUxfQ.b9vRCNE-tUa29Q3haZtKVVBCCCv2NfenSafUZmrU6J0', this)
            .on('posted', () => {
                console.log('Posted stats to Top.gg!')
            })*/

        this.utils.loadEvents()

        .catch(e => console.log(e))

        this.Database.init()
        this.login(token)
    }
}
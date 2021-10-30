const { createLogger, format, transports } = require('winston')
const { combine, timestamp, label, printf } = format
const chalk = require('chalk')
const Discord = require('discord.js')
const config = require('../config.json')

const formatting = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${level} [${chalk.cyan(label)}] ${message}]`
})

const customLevels = {
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        http: 3,
        verbose: 4,
        debug: 5,
        silly: 6
    }
}

const logger = createLogger({
    levels: customLevels.levels,
    format: combine(
        format.colorize(),
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        formatting
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: './assets/logs/Nya.log' })
    ]
})

module.exports = logger
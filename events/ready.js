const Event = require('../structures/Event')
const logger = require('../utils/logger')

module.exports = class extends Event {
    async run() {
        logger.info(`Logged in as ${this.client.user.tag}`, { label: 'Discord API' })
    }
}
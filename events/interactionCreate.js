const Event = require('../structures/Event')
const logger = require('../utils/logger')
const ping = require('../commands/ping')

module.exports = class extends Event {
    async run(interaction) {
        if (!interaction.isCommand()) return;

        await ping.run(interaction)
    }

    async runCommand(interaction) {
        const cmd = interaction.name
        const command = await this.client.commands.get(cmd)
        logger.info(`${interaction.name} command ran.`)

        await command.run(interaction)
    }
}
const Event = require('../structures/Event')
const logger = require('../utils/logger')

module.exports = class extends Event {
    async run(interaction) {
        if (interaction.isCommand()) {
            await interaction.deferReply({ ephemeral: false }).catch(() => {})
        }

        this.runCommand(interaction)
    }

    async runCommand(interaction) {
        let guildData = await this.client.Database.fetchGuild(interaction.guild.id)
        let langData = require(`../data/languages/${guildData.lang}.json`)

        let data = {}
        data.guild = guildData
        data.lang = langData
        const cmd = this.client.slashCommands.get(interaction.commandName)
        try {
            cmd.run(this.client, interaction, data).catch(e => {})
        } catch (error) {
            logger.error(error, { label: 'Error' })
            return interaction.reply({ content: data.lang.error, ephemeral: true })
        }
    }
}
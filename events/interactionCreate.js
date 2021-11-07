const Event = require('../structures/Event')
const logger = require('../utils/logger')
const ms = require('ms')
const config = require('../config.json')
const metrics = require('datadog-metrics')
const { MessageEmbed } = require('discord.js')
const progressbar = require('./../utils/string-progressbar/index');

const calculate = (a, b, d) => (a * d) / b

module.exports = class extends Event {
    async run(interaction) {
        this.runCommand(interaction)
    }

    async runCommand(interaction) {
        let guildData = await this.client.Database.fetchGuild(interaction.guild.id)
        let userData = await this.client.Database.fetchUser(interaction.member.id)
        let langData = require(`../data/languages/client/${userData.lang}.json`)
        let labelLang = require(`../data/languages/labels/${userData.lang}.json`)

        let data = {}
        data.guild = guildData
        data.user = userData
        data.lang = langData
        data.labels = labelLang

        const cmd = this.client.slashCommands.get(interaction.commandName)
        if(interaction.isCommand()) {
            try {
                let cmdCooldown = cmd.cooldown || 5
                const cooldown = cmdCooldown * 1000
                if (cmdCooldown) {
                    if (this.client.Timeout.has(`${cmd.name}${interaction.user.id}`)) {
                        let time1 = this.client.Timeout.get(cmd.name + interaction.user.id) - Date.now()
                        let value = calculate( time1, cmdCooldown, 10 )
                        const bar = progressbar.filledBar(50, value / 200, 15)

                        let cooldownEmbed = new MessageEmbed()
                            .setTitle(data.lang.on_cooldown)
                            .setDescription(`${data.lang.ready_in.replace('{time}', ms(this.client.Timeout.get(cmd.name + interaction.user.id) - Date.now(), { long: true }))} \n\n${bar.toString()}`)
                            .setColor(this.client.colors.redish)

                        return interaction.reply({ embeds: [cooldownEmbed], ephemeral: true })
                    } else {
                        this.client.Timeout.set(`${cmd.name}${interaction.user.id}`, Date.now() + cooldown)
                        try {
                            if (interaction.isCommand()) {
                                await interaction.deferReply({ ephemeral: false }).catch(() => {})
                            }
                            cmd.run(this.client, interaction, data).catch(e => {})
                        } catch (error) {
                            logger.error(error, { label: 'Error' })
                            return interaction.followUp({ content: data.lang.error, ephemeral: true })
                        }
                    }
    
                    setTimeout(() => {
                        this.client.Timeout.delete(`${cmd.name}${interaction.user.id}`)
                    }, cooldown)
                }
    
            } catch (e) {
                console.log(e)
            }
        }
    }
}
const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const economy = require('../../utils/economy')

module.exports = {
    name: "work",
    description: "Work at your restaurant and make some cods!",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async(client, interaction, data) => {
        try {
            let amount = Math.round(Math.random() * 250 + 150) * data.user.level
            await economy.giveMoney(interaction.user.id, amount)
            interaction.editReply({ content: `${data.lang.economy.worked} **${amount}** ${client.emoji.cod}!` })
        } catch (error) {
            console.log(error)
        }
    },
};
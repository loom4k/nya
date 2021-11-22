const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const economy = require('../../utils/economy')

module.exports = {
    name: "work",
    description: "Work at your restaurant and make some cods!",
    type: 'CHAT_INPUT',
    cooldown: 3660,
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async(client, interaction, data) => {
        try {
            const pay = await economy.pay(interaction.user.id, Math.round(Math.random() * 250 + 150)) + client.emoji.cod
            interaction.editReply({ content: data.lang.economy.worked.replace('{money}', pay) })
        } catch (error) {
            console.log(error)
        }
    },
};

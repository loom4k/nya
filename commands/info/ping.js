const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "ping",
    description: "Returns my websocket ping!",
    type: 'CHAT_INPUT',
    cooldown: 15,
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async(client, interaction, data) => {
        interaction.followUp({ content: `${data.lang.ping_message} ${client.ws.ping}ms.` })
    },
};
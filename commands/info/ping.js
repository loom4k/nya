const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "ping",
    description: "Returns my websocket ping!",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async(client, interaction, data) => {
        interaction.editReply({ content: `${data.lang.ping_message} ${client.ws.ping}ms.`, ephemeral: true })
    },
};
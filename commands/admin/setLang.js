const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "setlang",
    description: "Allows you to set the guild language",
    options: [
        {
            name: "language",
            description: "New language for your guild",
            required: true,
            type: "STRING",
            choices: [
                {
                    name: "english",
                    value: "en"
                },
                {
                    name: "french",
                    value: "fr"
                },
                {
                    name: "german",
                    value: "de"
                }
            ]
        }
    ],
    required: true,
    type: 'CHAT_INPUT',
    userPermissions: ['ADMINISTRATOR'],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, data) => {
        data.guild.lang = interaction.options.getString('language')
        await data.guild.save()
        interaction.editReply({ content: `${data.lang.new_language} \`${data.guild.lang}\``, ephemeral: true })
    },
};

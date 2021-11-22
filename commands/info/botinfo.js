const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const config = require('../../config.json')


module.exports = {
    name: "botinfo",
    description: "Returns information and stats about Nya",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async(client, interaction, data) => {
        const version = config.version
        const ram = ((process.memoryUsage().heapUsed / 1024 / 1024) + (process.memoryUsage().heapTotal / 1024 / 1024)).toFixed(2);
        const embed = {
            color: 'RANDOM',
            author: {
                name: client.user.username,
                icon_url: client.user.displayAvatarURL()
            },
            fields: [{
                    name: data.lang.bot_stats.developers,
                    value: '```loom4k#0001```',
                },
                {
                    name: data.lang.bot_stats.channels,
                    value: `\`\`\`${client.channels.cache.size}\`\`\``,
                    inline: true,
                },
                {
                    name: data.lang.bot_stats.users,
                    value: `\`\`\`${client.users.cache.size}\`\`\``,
                    inline: true,
                },
                {
                    name: data.lang.bot_stats.guilds,
                    value: `\`\`\`${client.guilds.cache.size}\`\`\``,
                    inline: true,
                },
                {
                    name: data.lang.bot_stats.ram,
                    value: `\`\`\`${ram}MB\`\`\``,
                    inline: true,
                },
                {
                    name: data.lang.bot_stats.api,
                    value: `\`\`\`${client.ws.ping} ms\`\`\``,
                    inline: true,
                },
                {
                    name: 'Version',
                    value: `\`\`\`${version}\`\`\``,
                    inline: true,
                }
            ],
            thumbnail: {
                url: client.user.displayAvatarURL(),
            },
        }

        interaction.followUp({ embeds: [embed] });
    },
};
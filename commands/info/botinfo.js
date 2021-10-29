const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const config = require('../../config.json')


module.exports = {
    name: "botinfo",
    description: "Returns information and stats about Wave",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const version = config.version
        let ram = ((process.memoryUsage().heapUsed / 1024 / 1024) + (process.memoryUsage().heapTotal / 1024 / 1024)).toFixed(2);
        let embed = {
            color: 'RANDOM',
            author: {
                name: client.user.username,
                icon_url: client.user.displayAvatarURL()
            },
            fields: [
                {
                    name: 'Developers',
                    value: '```loom4k#0001```',
                },
                {
                    name: 'Channels',
                    value: `\`\`\`${client.channels.cache.size}\`\`\``,
                    inline: true,
                },
                {
                    name: 'Users',
                    value: `\`\`\`${client.users.cache.size}\`\`\``,
                    inline: true,
                },
                {
                    name: 'Guilds',
                    value: `\`\`\`${client.guilds.cache.size}\`\`\``,
                    inline: true,
                },
                {
                    name: 'RAM usage',
                    value: `\`\`\`${ram}MB\`\`\``,
                    inline: true,
                },
                {
                    name: 'API latency',
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

const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const level = require('../../utils/level')

module.exports = {
    name: "profile",
    description: "Get all the information you need about your user",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async(client, interaction, data) => {
        try {
            let userLevel = await level(interaction.user.id)
            const embed = new MessageEmbed()
                .setTitle(data.lang.profile.title.replace('{user}', interaction.user.username))
                .setDescription(data.lang.profile.description.replace('{user}', interaction.user.username))
                .addFields({
                    name: data.lang.profile.cookname,
                    value: `\`\`\`${data.user.cookname || interaction.user.username}\`\`\``,
                    inline: true
                }, {
                    name: data.lang.profile.wallet,
                    value: `\`\`\`${data.user.currency.toLocaleString()}\`\`\``,
                    inline: true
                }, {
                    name: data.lang.profile.level,
                    value: `\`\`\`${userLevel.toLocaleString()}\`\`\``,
                    inline: true
                }, {
                    name: data.lang.profile.restaurant_name,
                    value: `\`\`\`${data.user.restaurantname}\`\`\``,
                    inline: true
                })
                .setThumbnail(interaction.user.displayAvatarURL())
                .setAuthor(client.user.tag, client.user.avatarURL())
                .setColor(client.colors.greeny)
            interaction.editReply({ embeds: [embed] })
        } catch (e) {
            console.log(e)
        }
    },
};
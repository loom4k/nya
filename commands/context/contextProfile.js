const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const mongoose = require('../../database/mongoose')
const level = require('../../utils/level')

module.exports = {
    name: "User Profile",
    type: 2,
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async(client, interaction, data) => {
        const user = await mongoose.fetchUser(interaction.targetId)
        const member = await client.users.cache.get(interaction.targetId)
        const userLevel = await level(user.id)
        const embed = new MessageEmbed()
            .setTitle(data.lang.profile.title.replace('{user}', member.username))
            .setDescription(data.lang.profile.description.replace('{user}', member.username))
            .addFields({
                name: data.lang.profile.cookname,
                value: `\`\`\`${user.cookname || member.username}\`\`\``,
                inline: true
            }, {
                name: data.lang.profile.wallet,
                value: `\`\`\`${user.currency.toLocaleString()}\`\`\``,
                inline: true
            }, {
                name: data.lang.profile.level,
                value: `\`\`\`${userLevel.toLocaleString()}\`\`\``,
                inline: true
            }, {
                name: data.lang.profile.restaurant_name,
                value: `\`\`\`${user.restaurantname}\`\`\``,
                inline: true
            })
            .setThumbnail(member.displayAvatarURL())
            .setAuthor(client.user.tag, client.user.avatarURL())
            .setColor(client.colors.greeny)
        interaction.reply({ embeds: [embed] })
    },
};
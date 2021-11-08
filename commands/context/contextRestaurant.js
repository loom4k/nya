const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const mongoose = require('../../database/mongoose')

module.exports = {
    name: "Restaurant Info",
    type: 2,
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async(client, interaction, data) => {
        let user = await mongoose.fetchUser(interaction.targetId)
        let member = await client.users.cache.get(interaction.targetId)
        let embed = new MessageEmbed()
            .setDescription(data.lang.restaurant.description.message)
            .setColor(client.colors.greeny)
        await embed
            .setTitle(data.lang.restaurant.description.rName.replace('{cook}', user.cookname))
            .addFields({
                name: data.lang.restaurant.description.name,
                value: `\`\`\`${user.restaurantname}\`\`\``,
                inline: true
            }, {
                name: data.lang.restaurant.description.speciality,
                value: `\`\`\`${user.speciality}\`\`\``,
                inline: true
            })
        interaction.reply({ embeds: [embed] })
    },
};
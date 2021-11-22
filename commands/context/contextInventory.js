const { MessageEmbed } = require("discord.js")
const mongoose = require('../../database/mongoose')

module.exports = {
    name: "Inventory",
    type: 2,
    run: async (client, interaction, data) => {
        try {
            const user = await mongoose.fetchUser(interaction.targetId)
            const member = await client.users.cache.get(interaction.targetId)

            const embed = new MessageEmbed()
                .setAuthor(data.lang.inventory_title.replace('{user}', member.tag), member.displayAvatarURL({ dynamic: true }))
                .setDescription(user.inventory.map(({ name, amount }) => `${amount} ${name}(s)`).join('\n'))
                .setColor(client.colors.greeny);

            interaction.reply({ embeds: [embed] })
        } catch (e) {
            console.log(e)
        }
    }
}

const { MessageEmbed } = require("discord.js")
const mongoose = require('../../database/mongoose')

module.exports = {
    name: "Inventory",
    type: 2,
    run: async(client, interaction, data) => {
        try {
            let user = await mongoose.fetchUser(interaction.targetId)
            let member = await client.users.cache.get(interaction.targetId)
            let reply = ``

            for (const item of user.inventory) {
                const { name, amount, emoji } = item

                reply += `${amount} ${name}(s)\n`
            }

            const embed = new MessageEmbed()
                .setAuthor(data.lang.inventory_title.replace('{user}', member.tag), member.displayAvatarURL({ dynamic: true }))
                .setDescription(reply)
                .setColor(client.colors.greeny)

            interaction.reply({ embeds: [embed] })
        } catch (e) {
            console.log(e)
        }
    }
}
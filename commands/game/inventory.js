const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "inventory",
    description: "Shows your inventory",
    run: async(client, interaction, data) => {
        try {
            let reply = ``

            for (const item of data.user.inventory) {
                const { name, amount, emoji } = item

                reply += `${amount} ${name}(s)\n`
            }

            const embed = new MessageEmbed()
                .setAuthor(data.lang.inventory_title.replace('{user}', interaction.user.tag), interaction.user.displayAvatarURL({ dynamic: true }))
                .setDescription(reply)
                .setColor(client.colors.greeny)

            interaction.followUp({ embeds: [embed] })
        } catch (e) {
            console.log(e)
        }
    }
}
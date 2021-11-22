const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "inventory",
    description: "Shows your inventory",
    run: async(client, interaction, data) => {
        try {
            const embed = new MessageEmbed()
                .setAuthor(data.lang.inventory_title.replace('{user}', interaction.user.tag), interaction.user.displayAvatarURL({ dynamic: true }))
                .setDescription(data.user.inventory.map(({ name, amount }) => `${amount} ${name}(s)`).join('\n'))
                .setColor(client.colors.greeny)

            interaction.followUp({ embeds: [embed] })
        } catch (e) {
            console.log(e)
        }
    }
}

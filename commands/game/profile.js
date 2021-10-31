const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

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
            const embed = new MessageEmbed()
                .setTitle(`${interaction.user.username}'s Profile`)
                .setDescription(`This is the profile of ${interaction.user.username}. You can see his wallet, chef name, and more about his little restaurant!`)
                .addFields({
                    name: 'Cook name',
                    value: `\`\`\`${data.user.cookname || interaction.user.username}\`\`\``,
                    inline: true
                }, {
                    name: 'Cod Wallet',
                    value: `\`\`\`${data.user.currency.toLocaleString()}\`\`\``,
                    inline: true
                }, {
                    name: 'Level',
                    value: `\`\`\`${data.user.level}\`\`\``,
                    inline: true
                }, {
                    name: 'Restaurant Name',
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
const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const storeItems = require('../../utils/economy/items')
const marketItems = require('../../utils/economy/marketItems')

module.exports = {
    name: "shop",
    description: "Buy new items for your collection and personnal use!",
    type: 'CHAT_INPUT',
    options: [{
        name: "shop",
        description: "Where do you wanna buy your items?",
        required: true,
        type: "STRING",
        choices: [{
                name: "market place",
                value: "market",
            },
            {
                name: "convenience store",
                value: "store"
            }
        ]
    }],
    cooldown: 5,
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async(client, interaction, data) => {
        const storeItm = storeItems.map((value, index) => {
            return [
                `**${value.price.toLocaleString()} ${client.emoji.cod}** ― ${value.emoji || ''} **${value.name}** (${value.id})`,
            ].join('\n')
        }).join('\n\n')

        const marketItm = marketItems.map((value, index) => {
            return [
                `**${value.price.toLocaleString()} ${client.emoji.cod}** ― **${value.name}** (${value.id})`,
            ].join('\n')
        }).join('\n\n')

        const storeEmbed = new MessageEmbed()
            .setTitle(data.lang.store.convenience_title + ' ' + client.emoji.cod)
            .setDescription('*' + data.lang.store.item_buy_indications + '*\n\n' + storeItm)
            .setAuthor(client.user.tag, client.user.displayAvatarURL())
            .setColor(client.colors.greeny)

        const marketEmbed = new MessageEmbed()
            .setTitle(data.lang.store.market_title + ' ' + client.emoji.sushi)
            .setDescription('*' + data.lang.store.item_buy_indications + '*\n\n' + marketItm)
            .setAuthor(client.user.tag, client.user.displayAvatarURL())
            .setColor(client.colors.greeny)

        if (interaction.options.getString('shop') == 'market') {
            interaction.followUp({ embeds: [marketEmbed] })
        } else {
            interaction.followUp({ embeds: [storeEmbed] })
        }
    },
};
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
        const storeItm = storeItems.map(({ price, emoji, name, id }) => `**${price.toLocaleString()} ${client.emoji.cod}** ― ${emoji || ''} **${name}** (${id})`).join('\n\n')
        const marketItm = marketItems.map(({ price, name, id }) => `**${price.toLocaleString()} ${client.emoji.cod}** ― **${name}** (${id})`).join('\n\n')

        const storeEmbed = new MessageEmbed()
            .setTitle(data.lang.store.convenience_title + ' ' + client.emoji.cod)
            .setDescription('*' + data.lang.store.item_buy_indications + '*\n\n' + storeItm)
            .setAuthor(client.user.tag, client.user.displayAvatarURL())
            .setColor(client.colors.greeny);

        const marketEmbed = new MessageEmbed()
            .setTitle(data.lang.store.market_title + ' ' + client.emoji.sushi)
            .setDescription('*' + data.lang.store.item_buy_indications + '*\n\n' + marketItm)
            .setAuthor(client.user.tag, client.user.displayAvatarURL())
            .setColor(client.colors.greeny);

        interaction.followUp({ embeds: [interaction.options.getString('shop') === 'market' ? marketEmbed : storeEmbed] });
    },
};

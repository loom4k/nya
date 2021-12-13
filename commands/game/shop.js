const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const storeItems = require('../../utils/economy/items')
const marketItems = require('../../utils/economy/marketItems')
const winterItems = require('../../utils/economy/winterItems')

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
            },
            {
                name: "winter palace",
                value: "winter"
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
        try {
            const storeItm = storeItems.map(({ price, emoji, name, id }) => `**${price.toLocaleString()} ${client.emoji.cod}** ― ${emoji || ''} **${name}** (${id})`).join('\n\n')
            const winterItm = winterItems.map(({ price, emoji, name, id }) => `**${price.toLocaleString()} ${client.emoji.cod}** ― ${emoji || ''} **${name}** (${id})`).join('\n\n')
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

            const winterEmbed = new MessageEmbed()
                .setTitle(data.lang.store.winter_title + ' ' + client.emoji.snow_cloud)
                .setDescription('*' + data.lang.store.item_buy_indications + '*\n\n' + winterItm)
                .setAuthor(client.user.tag, client.user.displayAvatarURL())
                .setColor(client.colors.greeny);

                interaction.options.getString('shop') === 'market' ? marketEmbed : storeEmbed

            if(interaction.options.getString('shop') === 'market') {
                interaction.followUp({ embeds: [marketEmbed] });
            } else if(interaction.options.getString('shop') === 'winter') {
                interaction.followUp({ embeds: [winterEmbed] });
            } else {
                interaction.followUp({ embeds: [storeEmbed] });
            }
        } catch(e) {
            console.log(e)
        }
    },
};

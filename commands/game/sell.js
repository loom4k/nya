const { MessageEmbed } = require("discord.js")
const items = require("../../utils/economy/items.js")
let marketItems = require("../../utils/economy/marketItems")
const userSchema = require("../../database/schemas/User")

module.exports = {
    name: "sell",
    description: "Return all your cookies to the market, and get back a portion of the money",
    options: [{
        name: "itemid",
        description: "Item ID from the shop",
        required: true,
        type: "STRING"
    }, {
        name: "amount",
        description: "Amount of item to return :(",
        required: false,
        type: "INTEGER"
    }],
    run: async(client, interaction, data) => {
        try {
            const id = interaction.user.id
            let name;

            const itemID = interaction.options.getString("itemid")
            const item = items.find((val) => val.id.toLowerCase() === itemID) || marketItems.find((val) => val.id.toLowerCase() === itemID);
            const amount = Math.min(Number(interaction.options.getInteger("amount")) || 1, 1);

            if (item) {
                const cost = (item.price * 0.65) * amount
                const userFound = await userSchema.findOne({ id: interaction.user.id });
                if (!userFound) {
                    return interaction.followUp({ content: data.lang.store.not_enough_money })
                }
                if (userFound.currency < cost) {
                    return interaction.followUp({ content: `${data.lang.store.not_enough.replace('{amount}', amount).replace('{item}', item.name)}` })
                }

                const { inventory } = userFound
                if (!inventory.find((val) => val.name === item.name)) {
                    await userSchema.findOneAndUpdate({
                        id
                    }, {
                        id,
                        currency: userFound.currency + cost,
                        $push: {
                            inventory: {
                                name: item.name,
                                amount
                            }
                        }
                    }, {
                        upsert: true
                    })

                } else {
                    await userSchema.findOneAndUpdate({
                        id
                    }, {
                        id,
                        currency: userFound.currency + cost,
                        inventory: {
                            name: item.name,
                            amount: hasItem.amount - amount
                        }
                    }, {
                        upsert: true
                    })
                }

                const embed = new MessageEmbed()
                    .setColor(client.colors.greeny)
                    .setAuthor(data.lang.store.success.replace('{user}', interaction.user.tag), interaction.user.displayAvatarURL({ dynamic: true }))
                    .setDescription(data.lang.store.sold.replace('{user}', interaction.user).replace('{amount}', amount.toLocaleString() + ' ' + item.name).replace('{cost}', cost.toLocaleString()))

                interaction.followUp({ embeds: [embed] })
            }
            
            return interaction.followUp({ content: data.lang.wrong_id })
        } catch (e) {
            console.log(e)
        }
    }
}

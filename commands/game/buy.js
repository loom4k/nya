const { MessageEmbed } = require("discord.js")
const items = require("../../utils/economy/items.js")
let marketItems = require("../../utils/economy/marketItems")
const userSchema = require("../../database/schemas/User")

module.exports = {
    name: "buy",
    description: "Buy all the cookies you need! As long as you have enough money",
    options: [{
        name: "itemid",
        description: "The ID of the item",
        type: "STRING",
        required: true
    }, {
        name: "amount",
        description: "The amount of item you want to buy",
        required: false,
        type: "INTEGER"
    }],
    run: async(client, interaction, data) => {
        try {
            const itemID = interaction.options.getString("itemid")
            let amount = interaction.options.getInteger("amount")
            let item = items.find((val) => val.id.toLowerCase() === itemID) || marketItems.find((val) => val.id.toLowerCase() === itemID);

            if (amount <= 0 || !amount) {
                amount = 1
            }

            if (item) {
                const cost = item.price * amount
                const userFound = await userSchema.findOne({ id: interaction.user.id });
                if (!userFound) {
                    return interaction.followUp({ content: data.lang.store.not_enough_money })
                }
                if (userFound.currency < cost) {
                    return interaction.followUp({ content: `${data.lang.store.not_enough.replace('{amount}', amount).replace('{item}', item.name)}` })
                }

                const { inventory } = userFound

                let id = interaction.user.id
                const hasItem = inventory.find((val) => val.name === item.name)
                if (!hasItem) {
                    await userSchema.findOneAndUpdate({
                        id
                    }, {
                        id,
                        currency: userFound.currency - cost,
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
                        currency: userFound.currency - cost,
                        inventory: {
                            name: item.name,
                            amount: hasItem.amount + amount
                        }
                    }, {
                        upsert: true
                    })
                }

                const embed = new MessageEmbed()
                    .setColor(client.colors.greeny)
                    .setAuthor(data.lang.store.success.replace('{user}', interaction.user.tag), interaction.user.displayAvatarURL({ dynamic: true }))
                    .setDescription(data.lang.store.bought.replace('{user}', interaction.user).replace('{amount}', amount.toLocaleString() + ' ' + item.name).replace('{cost}', cost.toLocaleString()))

                interaction.followUp({ embeds: [embed] })
            } else return interaction.followUp({ content: data.lang.wrong_id })
        } catch (e) {
            console.log(e)
        }
    }
}
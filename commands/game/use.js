const { MessageEmbed } = require("discord.js")
const items = require("../../utils/economy/items.js")
const userSchema = require("../../database/schemas/User")

module.exports = {
    name: "use",
    description: "Use your favorite items! Cookies :)",
    options: [{
        name: "item",
        description: "The item ID, Ex: cookie",
        required: true,
        type: "STRING"
    }, {
        name: "amount",
        description: "How many cookies do you wanna eat?",
        required: false,
        type: "INTEGER"
    }],
    cooldown: 1,
    run: async(client, interaction, data) => {
        try {
            const itemID = interaction.options.getString("item")
            let amount = interaction.options.getInteger("amount")
            const id = interaction.user.id
            const item = items.find((val) => val.id.toLowerCase() === itemID);
            if (!item) {
                return interaction.followUp({ content: data.lang.wrong_id })
            }

            if (amount <= 0 || !amount) {
                amount = 1
            }

            const itemName = item.name;

            if (item.useable == false) {
                return interaction.followUp({ content: data.lang.item.cannot_be_used })
            }

            const userFound = await userSchema.findOne({ id: interaction.member.id })
            if (!userFound) {
                return interaction.followUp({ content: data.lang.item.no_item })
            }

            const hasItem = userFound.inventory.find((val) => val.name === item.name)
            if (!hasItem) return interaction.followUp({ content: data.lang.no_item })

            if (hasItem.amount < amount) {
                return interaction.followUp({ content: data.lang.item.missing.replace('{amount}', amount.toLocaleString()).replace('{item}', itemName) })
            }
            if (hasItem.amount === amount) {
                await userSchema.findOneAndUpdate({
                    id
                }, {
                    id,
                    $pull: {
                        inventory: {
                            name: item.name,
                            amount: hasItem.amount
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
                    inventory: {
                        name: item.name,
                        amount: hasItem.amount - amount
                    }
                }, {
                    upsert: true
                })
            }

            var randomNumber = Math.floor(Math.random() * item.used.length)

            const embed = new MessageEmbed()
                .setColor(client.colors.greeny)
                .setAuthor(interaction.user.tag + ` ${data.lang.words.used_} ${data.lang.words.his_} ` + itemName)
                .setDescription(`${interaction.user} ${data.lang.words.used_} **${amount.toLocaleString()} ${itemName}(s)**!\n\n*${item.used[randomNumber]}*`)
                .setTimestamp(Date.now())

            interaction.followUp({ embeds: [embed] })
        } catch (e) {
            console.log(e)
        }
    }
}
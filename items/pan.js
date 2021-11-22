const { MessageEmbed } = require("discord.js")
const items = require("../utils/economy/items.js")
const marketItems = require("../utils/economy/marketItems")
const userSchema = require("../database/schemas/User")

module.exports = {
    run: async(client, interaction, data) => {
        try {
            const itemID = interaction.options.getString("item")
            const amount = interaction.options.getInteger("amount") || 1
            const id = interaction.user.id
            const item = items.find((val) => val.id.toLowerCase() === itemID) || marketItems.find((val) => val.id.toLowerCase() === itemID);
            if (!item) {
                return interaction.followUp({ content: data.lang.wrong_id })
            }

            const itemName = item.name;

            if (item.useable === false) {
                return interaction.followUp({ content: data.lang.item.cannot_be_used })
            }

            if (item.enabled !== true) {
                return interaction.followUp({ content: data.lang.item.disabled })
            }

            const userFound = await userSchema.findOne({ id: interaction.member.id })
            if (!userFound) {
                return interaction.followUp({ content: data.lang.item.no_item })
            }

            const hasItem = await userFound.inventory.find((val) => val.name === item.name)
            if (!hasItem) return interaction.editReply({ content: data.lang.item.no_item })

            if (hasItem.amount < amount) {
                return interaction.followUp({ content: data.lang.item.missing.replace('{amount}', amount.toLocaleString()).replace('{item}', item.name) })
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

            const randomNumber = Math.floor(Math.random() * item.used.length)

            data.user.timeDoublePay = Date.now()
            await data.user.save()

            const embed = new MessageEmbed()
                .setColor(client.colors.greeny)
                .setAuthor(interaction.user.tag + ` ${data.lang.words.used_} ${data.lang.words.his_} ` + itemName)
                .setDescription(`${interaction.user} ${data.lang.words.used_} **${amount.toLocaleString()} ${itemName}(s)**!\n\n*${item.used[randomNumber]}*`)
                .setTimestamp(Date.now())

            interaction.followUp({ embeds: [embed] })
        } catch(e) {
            console.log(e)
        }
    }
}
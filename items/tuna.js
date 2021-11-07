const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")
const items = require("../utils/economy/items.js")
let marketItems = require("../utils/economy/marketItems")
const userSchema = require("../database/schemas/User")

module.exports = {
    run: async(client, interaction, data) => {
        try {
            const itemID = interaction.options.getString("item")
            let amount = interaction.options.getInteger("amount") || 1
            const id = interaction.user.id
            let item = items.find((val) => val.id.toLowerCase() === itemID) || marketItems.find((val) => val.id.toLowerCase() === itemID);
            if (!item) {
                return interaction.followUp({ content: data.lang.wrong_id })
            }

            const itemName = item.name;

            if (item.useable == false) {
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

            var randomNumber = Math.floor(Math.random() * item.used.length)

            if(data.user.specialityLevel >= 2) {
                try {
                    const row = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setCustomId('use')
                            .setLabel(data.labels.use)
                            .setStyle(3),
                        new MessageButton()
                            .setCustomId('cancel')
                            .setLabel(data.labels.cancel)
                            .setStyle(4),
                    );

                    const toUseEmbed = new MessageEmbed()
                        .setColor(client.colors.redish)
                        .setAuthor(`${data.lang.item.want_to_use}`)
                        .setDescription(data.lang.item.speciality.lower_level)
                        
                    interaction.followUp({ embeds: [toUseEmbed], components: [row] })

                    const filter = i => i.user.id === interaction.member.id;

                    const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

                    const usedEmbed = new MessageEmbed()
                        .setColor(client.colors.greeny)
                        .setAuthor(interaction.user.tag + ` ${data.lang.words.used_} ${data.lang.words.his_} ` + itemName)
                        .setDescription(`${interaction.user} ${data.lang.words.used_} **${amount.toLocaleString()} ${itemName}(s)**!\n\n*${item.used[randomNumber]}*`)
                        .setTimestamp(Date.now())
                    
                    const cancelEmbed = new MessageEmbed()
                        .setColor(client.colors.redish)
                        .setDescription(data.lang.item.cancel)

                    collector.on('collect', async i => {
                        if (i.customId === 'use') {
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
                            data.user.speciality = 'tuna'
                            data.user.specialityLevel = 2
                            await data.user.save()
                            await i.reply({ embeds: [usedEmbed], components: [] })
                            await interaction.deleteReply()
                        } else if(i.customId === 'cancel') {
                            await i.reply({ embeds: [cancelEmbed], ephemeral: true, components: [] })
                            await interaction.deleteReply()
                        }
                    });

                    collector.on('end', () => {
                        interaction.deleteReply()
                    })
                } catch(e) {
                    console.log(e)
                }
            } else {
                try {
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
                    data.user.speciality = 'tuna'
                    data.user.specialityLevel = 2
                    await data.user.save()

                    const usedEmbed = new MessageEmbed()
                        .setColor(client.colors.greeny)
                        .setAuthor(interaction.user.tag + ` ${data.lang.words.used_} ${data.lang.words.his_} ` + itemName)
                        .setDescription(`${interaction.user} ${data.lang.words.used_} **${amount.toLocaleString()} ${itemName}(s)**!\n\n*${item.used[randomNumber]}*`)
                        .setTimestamp(Date.now())

                    interaction.followUp({ embeds: [usedEmbed] })
                } catch(e) {
                    console.log(e)
                }
            }
        } catch(e) {
            console.log(e)
        }
    }
}
const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const items = require("../../utils/economy/items.js")
const userSchema = require("../../database/schemas/User")

module.exports = {
    name: "givecookie",
    description: "Returns my websocket ping!",
    type: 'CHAT_INPUT',
    options: [{
        name: "amount",
        description: "The amount of cookie you wanna give",
        type: 'INTEGER',
        required: true
    }],
    cooldown: 1,
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async(client, interaction, data) => {
        try {
            const userFound = await userSchema.findOne({ id: interaction.member.id })
            let item = items.find((val) => val.id.toLowerCase() === "cookie");
            const { inventory } = userFound
            let id = interaction.user.id
            let amount = interaction.options.getInteger('amount')

            const hasItem = inventory.find((val) => val.name === item.name)
            await userSchema.findOneAndUpdate({
                id
            }, {
                id,
                $push: {
                    inventory: {
                        name: item.name,
                        amount
                    }
                }
            }, {
                upsert: true
            })
            return interaction.followUp({ content: "gave cookie" })
        } catch (e) {
            console.log(e)
        }
    },
};
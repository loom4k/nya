const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "restaurant",
    description: "Customize your restaurant",
    type: 'CHAT_INPUT',
    options: [{
            name: "name",
            description: "Change the name of your restaurant. Give it something fancy!",
            type: 'SUB_COMMAND',
            options: [{
                name: "newname",
                description: "The new name of your kitchen",
                type: 'STRING',
                required: true
            }]
        },
        {
            name: "cook",
            description: "Change the name of your restaurant cook. It's you!",
            type: 'SUB_COMMAND',
            options: [{
                name: "cookname",
                description: "The new name of your restaurant cook! Be creative",
                type: 'STRING',
                required: true
            }]
        }
    ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async(client, interaction, data) => {
        if (interaction.options.getSubcommand() == 'name') {
            data.user.restaurantname = interaction.options.getString('newname')
            await data.user.save()
            interaction.followUp({ content: `${data.lang.restaurant.new_name}: \`${interaction.options.getString('newname')}\`. (What a great name!)` })
        } else if (interaction.options.getSubcommand() == 'cook') {
            data.user.cookname = interaction.options.getString('cookname')
            await data.user.save()
            interaction.followUp({ content: `${data.lang.restaurant.new_cook}: \`${interaction.options.getString('cookname')}\`. (What a great name!)` })
        }
    },
};
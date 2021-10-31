const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "restaurant",
    description: "Customize your restaurant",
    type: 'CHAT_INPUT',
    cooldown: 3,
    options: [{
            name: "info",
            description: "Get some info about your restaurant.",
            type: 'SUB_COMMAND'
        },
        {
            name: "modify",
            description: "Customize your restaurant! Make it fancy",
            type: 'SUB_COMMAND_GROUP',
            options: [{
                    name: "name",
                    description: "Modify the name of your restaurant",
                    type: 'SUB_COMMAND',
                    options: [{
                        name: "newname",
                        description: "New restaurant name...",
                        type: 'STRING',
                        required: true
                    }]
                },
                {
                    name: "cook",
                    description: "Change your cook name. Grand Chef!",
                    type: 'SUB_COMMAND',
                    options: [{
                        name: "newcookname",
                        description: "Your new cook name",
                        type: "STRING",
                        required: true
                    }]
                }
            ]
        },

    ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async(client, interaction, data) => {
        if (interaction.options.getSubcommand() == 'info') {
            let embed = new MessageEmbed()
                .setDescription(data.lang.restaurant.description.message)
                .setColor(client.colors.greeny)
            await embed
                .setTitle(data.lang.restaurant.description.rName1 + " " + data.user.cookname + data.lang.restaurant.description.rName2)
                .addFields({
                    name: data.lang.restaurant.description.name,
                    value: `\`\`\`${data.user.restaurantname}\`\`\``,
                    inline: true
                }, {
                    name: data.lang.restaurant.description.speciality,
                    value: `\`\`\`${data.user.speciality}\`\`\``,
                    inline: true
                })
            interaction.followUp({ embeds: [embed] })
        } else if (interaction.options.getSubcommand() == 'name') {
            data.user.restaurantname = interaction.options.getString('newname')
            await data.user.save()
            interaction.followUp({ content: `${data.lang.restaurant.new_name}: \`${interaction.options.getString('newname')}\`` })
        } else if (interaction.options.getSubcommand() == 'cook') {
            data.user.cookname = interaction.options.getString('newcookname')
            await data.user.save()
            interaction.followUp({ content: `${data.lang.restaurant.new_cook}: \`${interaction.options.getString('cookname')}\`` })
        }
    },
};
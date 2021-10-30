const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "chatbot",
    description: "Talk to a bot that can't understand you",
    options: [{
        name: "message",
        description: "Tell me what you want",
        type: "STRING",
        required: true
    }],

    run: async(client, interaction, data) => {
        try {
            const { user, options } = interaction;
            const question = options.getString("message");

            const response = await client.Chatbot.chat(question)

            const embed = new MessageEmbed()
                .setDescription(`**${user.tag}:** ${question}\n**${client.user.tag}:** ${response}`)

            interaction.followUp({ embeds: [embed] })
        } catch (err) {
            console.log(err)
        }
    }
}
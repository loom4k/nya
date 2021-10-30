const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "chatbot",
    description: "Talk to a bot that can't understand you",
    options: [{
        name: "message",
        description: "The message you want me to answer",
        type: "STRING",
        required: true
    }],

    run: async(client, interaction, data) => {
        try {
            const { user, options } = interaction;
            const question = options.getString("message");

            const response = await client.Chatbot.chat(question)

            interaction.followUp({ content: `**${user.tag}** > ${question}\n**Nya** > ${response}` })

            const hintChances = Math.round(Math.random() * 100)
            if (hintChances <= 10) interaction.followUp({ content: "The chatbot responses aren't being translated to the guild language, [learn more...](https://soon.com)", ephemeral: true })
        } catch (err) {
            console.log(err)
        }
    }
}
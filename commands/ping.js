const Command = require('../structures/Command')

module.exports = /*class extends Command*/ {
    name: 'pong',
    description: 'sends pong!',
    async run(interaction) {
        interaction.reply({ content: "Pong!" })
    }
}
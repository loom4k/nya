const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { main_token } = require('./config.json');
const fs = require('fs')

const commands = []
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`)
    const builder = new SlashCommandBuilder()
        .setName(command.name)
        .setDescription(command.description)
    commands.push(builder)
}

const rest = new REST({ version: '9' }).setToken(main_token);

rest.put(Routes.applicationGuildCommands("894729288337731645", "810987789847101491"), { body: commands.map(command => command.toJSON()) })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);
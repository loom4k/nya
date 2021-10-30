const { SlashCommandBuilder, SlashCommandStringOption } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, main_token } = require('./config.json');

const commands = [
        new SlashCommandBuilder().setName('chatbot').setDescription('Talk to a bot that can\'t understand you. (Global command)').addStringOption(option =>
            option.setName('message')
            .setDescription('Tell me what you want')
            .setRequired(true)),
        new SlashCommandBuilder().setName('ping').setDescription('Ping pong! (Global command)')
    ]
    .map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(main_token);

rest.put(Routes.applicationCommands("894729288337731645"), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);
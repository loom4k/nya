# Nya
Nya is a minigame bot based on Discord's new interactions features. It uses slash commands to interact with the user as well as context menus and buttons.

Nya is open-source, this means anyone can easily contribute and add the features they would like to see in the bot. 

## Running
Nya runs on [Nodejs 16.13](https://nodejs.org/en/). So make sure you have that installed. If you don't, you can use [Choco](https://chocolatey.org/) or [Node Version Manager (nvm)](https://github.com/coreybutler/nvm-windows) to install it.

### Dependencies:
To install required packages like Discord.js and Express, simply run
```shell
$ npm install
```
And check your `package-lock.json` file to make sure everything is installed.

### Environnement variables
Rename both `config.example.json` and `.env.example` to `config.json` and `.env` respectively. You can then fill in the blanks using your development bot token and datadog api keys.

### Running
To start the bot, simply run
```shell
$ node index.js
```
This will start your client. Enjoy!

## Contributing
Fell free to use the basic Github features to contribute and submit your pull requests! If you have any issues with running the bot or experience trouble using the APIs, [create an issue](https://github.com/loom4k/nya/issues/new).
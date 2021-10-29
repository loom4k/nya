const Event = require('../structures/Event')
const logger = require('../utils/logger')
const config = require('../config.json')
const { glob } = require('glob')
const { promisify } = require('util')

const globPromise = promisify(glob)

module.exports = class extends Event {
    async run() {
        // Slash Commands
    const slashCommands = await globPromise(
        `${process.cwd()}/commands/*/*.js`
    );

    const arrayOfSlashCommands = [];
    slashCommands.map((value) => {
        const file = require(value);
        if (!file?.name) return;
        this.client.slashCommands.set(file.name, file);

        if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
        if(file.userPermissions) file.defaultPermission = false;
        arrayOfSlashCommands.push(file);
        logger.info(`Loaded commands ${file.name}`, { label: 'Commands' })
    });

        // Register for a single guild
        const guild = this.client.guilds.cache.get(config.guild_id)
        await guild.commands.set(arrayOfSlashCommands).then((cmd) => {
            const getRoles = (commandName) => {
                const permissions = arrayOfSlashCommands.find(x => x.name === commandName).userPermissions

                if(!permissions) return null;
                return guild.roles.cache.filter(x => x.permissions.has(permissions) && !x.managed)
            }

        const fullPermissions = cmd.reduce((accumulator, x) => {
            const roles = getRoles(x.name)
            if(!roles) return accumulator;

            const permissions = roles.reduce((a, v) => {
                return [
                    ...a,
                    {
                        id: v.id,
                        type: "ROLE",
                        permission: true
                    }
                ]
            }, [])
            return [
                ...accumulator,
                {
                    id: x.id,
                    permissions
                }
            ]
        }, [])
        guild.commands.permissions.set({ fullPermissions })
        });

        const activities = [
            { name: this.client.guilds.size + 'guilds', type: 'WATCHING' },
            { name: 'development', type: 'WATCHING' }
        ]

        await this.client.user.setPresence({ status: 'online', activity: activities[0] })
        logger.info(`Set client presence`, { label: 'Client' })
        logger.info(`Logged in as ${this.client.user.tag}`, { label: 'Discord API' })
    }
}
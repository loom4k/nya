const { Permissions } = require('discord.js')

module.exports = class Command {
    constructor(client, name, options = {}) {
        this.client = client
        this.name = options.name || name
        this.description = options.description || 'A discord slash command.'
        this.disabled = options.disabled || false
        this.botPermission = option.botPermission || ['ADMINISTRATOR']
        this.userPermission = options.userPermission || null
    }

    async run() {
        throw new Error(`The run method has not been implemented in ${this.name}.`)
    }

    reload() {
        return this.store.load(this.file.path)
    }
}
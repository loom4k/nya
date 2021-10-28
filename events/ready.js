const Event = require('../structures/Event')

module.exports = class extends Event {
    async run() {
        console.log(`Logged in as ${this.client.user.tag}`)
    }
}
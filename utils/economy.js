const { MessageEmbed } = require('discord.js')
const { stripIndent } = require('common-tags')
const database = require('../database/mongoose')

/**
 * Gives money (cod) to a user
 * @param {String} id
 * @param {Int} amount
 */
async function giveMoney(id, amount) {
    const userData = await database.fetchUser(id)

    userData.currency = userData.currency + amount
    userData.save()
}

async function pay(id, amount) {
    const userData = await database.fetchUser(id)

    if (Date.now() <= (userData.timeDoublePay + (24 * 60 * 60))) {
        const amountToPay = amount * 2
        await giveMoney(id, amountToPay)
        return amountToPay + " (2x bonus)"
    } else {
        const amountToPay = amount
        await giveMoney(id, amountToPay)
        return amountToPay

    }

}

module.exports = { giveMoney, pay }
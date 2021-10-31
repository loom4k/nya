const { MessageEmbed } = require('discord.js')
const { stripIndent } = require('common-tags')
const database = require('../database/mongoose')

/**
 * Gives money (cod) to a user
 * @param {String} id
 * @param {Int} amount
 */
async function giveMoney(id, amount) {
    let userData = await database.fetchUser(id)

    userData.currency = userData.currency + amount
    userData.save()
}

async function pay(id, amount) {
    let userData = await database.fetchUser(id)

    if (userData.doublePay == true && Date.now() <= (userData.timeDoublePay + (24 * 60 * 60))) {
        let amountToPay = amount * 2
        return amountToPay + " (2x bonus)"
    } else {
        let amountToPay = amount
        return amountToPay

    }

}

module.exports = { giveMoney, pay }
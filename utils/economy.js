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

    return userData
}

module.exports = { giveMoney }
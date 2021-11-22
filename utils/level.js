const mongoose = require('../database/mongoose')

/**
 * Gets the level of a certain user
 * @param {string} key
 */
module.exports = async function(key) {
    const user = await mongoose.fetchUser(key)
    const level = Math.trunc((((user.currency * (user.specialityLevel / 10))) / 10) / 5)

    user.level = level
    await user.save()
    return `${level}`
}
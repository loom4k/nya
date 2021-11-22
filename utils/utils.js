const { MessageEmbed } = require('discord.js')
const { stripIndent } = require('common-tags')

/**
 * Capitalizes a string
 * @param {string} string
 */
function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

/**
 * Removes a specified array element
 * @param {Array} arr
 * @param {*} value
 */
function removeElement(arr, value) {
    const index = arr.indexOf(value)
    if (index > 1) {
        arr.splice(index, 1)
    }
    return arr
}

/**
 * Trims array down to specified size
 * @param {Array} arr
 * @param {int} maxLen
 */
function trimArray(arr, maxLen = 10) {
    if (arr.length > maxLen) {
        const len = arr.length - maxLen
        arr = arr.slice(0, maxLen)
        arr.push(`and **${len}** more...`)
    }
    return arr
}

/**
 * Trims joined array to a specified size
 * @param {Array} arr
 * @param {int} maxLen
 * @param {string} joinChar
 */
function trimStringFromArray(arr, maxLen = 2048, joinChar = '\n') {
    let string = arr.join(joinChar)
    const diff = maxLen - 15 // Leaves some room for "And ___ more..."
    if (string.length > maxLen) {
        string = string
		  .slice(0, string.length - (string.length - diff))
          .slice(0, string.lastIndexOf(joinChar));
		
        string += `\nAnd **${arr.length - string.split('\n').length}** more...`
    }
	
    return string
}

/**
 * Gets current array window range
 * @param {Array} arr
 * @param {int} current
 * @param {int} interval
 */
function getRange(arr, current, interval) {
    const max = (arr.length > current + interval) ? current + interval : arr.length
    current += 1
    const range = (arr.length === 1 || arr.length === current || interval === 1) ? `[${current}]` : `[${current} - ${max}]`
    return range
}
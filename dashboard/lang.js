const i18n = require('i18n')

i18n.configure({
    // Setup some locales
    locales: ['en', 'fr'],

    // Directory to store json files
    directory: process.cwd() + '/data/languages/dashboard',

    defaultLocale: 'en',

    // Set a custom cookie name to parse locale settings from - default to NULL
    cookie: 'lang'
})

module.exports = function(req, res, next) {
    i18n.init(req, res)
    res.local('__', res.__)

    let current_locale = i18n.getLocale()

    return next()
}
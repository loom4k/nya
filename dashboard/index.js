const Discord = require("discord.js");
const url = require("url");
const path = require("path");
const uniqid = require('uniqid');
const express = require("express");
const passport = require("passport");
const jsonconfig = require('../config.json');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const { Strategy } = require("passport-discord");
const config = require("../config");
const ejs = require("ejs");

const bodyParser = require("body-parser");
const { readdirSync } = require('fs');
const { WebhookClient, MessageEmbed } = require('discord.js');
const mongoose = require('mongoose');
const db = require('../database/mongoose')
const moment = require('moment')
const fs = require('fs');

const i18n = require('i18n')

//important 
const domain = config.domain;
const clientID = config.client_id;
const secret = config.secret;

const app = express();
app.use(express.static('dashboard/static'));

async function getUserLang(key) {
    const user = await db.fetchUser(key)
    const langFile = require(`../data/languages/dashboard/${user.lang}.json`);

    return langFile;
}

module.exports = async(client) => {
    const dataDir = path.resolve(`${process.cwd()}${path.sep}dashboard`);

    const templateDir = path.resolve(`${dataDir}${path.sep}templates`);


    passport.serializeUser((user, done) => done(null, user));
    passport.deserializeUser((obj, done) => done(null, obj));


    passport.use(new Strategy({
        clientID: `${clientID}`,
        clientSecret: `${secret}`,
        callbackURL: `${domain}/callback`,
        scope: ["identify", "guilds"]
    }, (accessToken, refreshToken, profile, done) => {
        process.nextTick(() => done(null, profile));
    }));

    app.use(session({
        secret: 'asdasdasda7734r734753ererfretertdf43534wfefrrrr4awewdasdadadad',
        resave: true,
        saveUninitialized: true,
        store: MongoStore.create({ mongoUrl: jsonconfig.mongodb_url })
    }));


    // We initialize passport middleware.
    app.use(passport.initialize());
    app.use(passport.session());

    app.locals.domain = config.domain.split("//")[1];

    app.engine("html", ejs.renderFile);
    app.set("view engine", "html");

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    // Redirects
    app.get('/my', (req, res) => { res.redirect('/en/my') })

    const renderTemplate = (res, req, template, data = {}) => {
        const hostname = req.headers.host;
        const pathname = url.parse(req.url).pathname;

        const baseData = {
            https: "https://",
            domain: domain,
            bot: client,
            hostname,
            pathname,
            path: req.path,
            user: req.isAuthenticated() ? req.user : null,
            verification: config.verification,
            description: config.description,
            url: res,
            req,
            name: client.username,
            tag: client.tag,
        };
        res.render(path.resolve(`${templateDir}${path.sep}${template}`), Object.assign(baseData, data));
    };

    const checkAuth = (req, res, next) => {
        if (req.isAuthenticated()) return next();
        req.session.backURL = req.url;
        res.redirect("/login");
    }

    const funkyObject = {}
    
    i18n.configure({
        locales: ['en', 'de', 'fr'],
        defaultLocale: 'en',
        fallbacks: {'fr': 'en'},
        register: funkyObject,
        directory: path.join(process.cwd(), 'data/languages/dashboard'),
        updateFiles: false,
    })   

    app.use(i18n.init)

    // Login endpoint.
    app.get("/login", (req, res, next) => {

            if (req.session.backURL) {
                req.session.backURL = req.session.backURL;

            } else if (req.headers.referer) {

                const parsed = url.parse(req.headers.referer);
                if (parsed.hostname === app.locals.domain) {
                    req.session.backURL = parsed.path;
                }


            } else {
                req.session.backURL = "/";
            }
            // Forward the request to the passport middleware.
            next();
        },
        passport.authenticate("discord"));

    // Callback endpoint.
    app.get("/callback", passport.authenticate("discord", {
        failWithError: true,
        failureFlash: "There was an error logging you in!",
        failureRedirect: "/",
    }), async(req, res) => {
        try {

            if (req.session.backURL) {

                const url = req.session.backURL;
                req.session.backURL = null;
                res.redirect(url);

            } else {

                const member = await client.users.fetch(req.user.id);
                if (member) {

                    const login = new MessageEmbed()
                        .setColor('GREEN')
                        .setTitle(`Login Logs`)
                        .setDescription(`\nUser: ${member.tag}\`(${member.id})\`\nTime: ${moment(new Date()).format("dddd, MMMM Do YYYY HH:mm:ss")} `);

                    loginLogs.send({
                        username: 'Login Logs',
                        embeds: [login]
                    });
                }

                res.redirect("/");
            }
        } catch (err) {
            res.redirect('/')
        }
    });

    app.get("/:lang/my", checkAuth, async(req, res) => {
        i18n.setLocale(req, req.params.lang)
        const server = client.guilds.cache.get('904026551039967312');
        const user = server.members.cache.has(req.user.id);
        const lang = await getUserLang(req.user.id)

        renderTemplate(res, req, "dashboard.ejs", {
            perms: Discord.Permissions,
            userExists: user,
            lang,
        });
    });

    app.get("/:lang/my/:guildID", checkAuth, async(req, res) => {
        i18n.setLocale(req, req.params.lang)
        const guild = client.guilds.cache.get(req.params.guildID);
        if (!guild) return res.redirect("/my");
        const member = await guild.members.fetch(req.user.id);
        if (!member) return res.redirect("/my");
        if (!member.permissions.has("MANAGE_GUILD")) return res.redirect("/my");

        renderTemplate(res, req, "settings.ejs", {
            guild,
            alert: `Dashboard might be a little bit buggy due to discord intent problems.`,
            nickname: guild.me.nickname || guild.me.user.username,
        });
    });

    app.listen(config.port, null, null, () => console.log(`Dashboard up and running on port ${config.port}`))
}

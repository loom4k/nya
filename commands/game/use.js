const { glob } = require('glob')
const { promisify } = require('util')

const globPromise = promisify(glob)

module.exports = {
    name: "use",
    description: "Use your favorite items! Cookies :)",
    options: [{
        name: "item",
        description: "The item ID, Ex: cookie",
        required: true,
        type: "STRING"
    }, {
        name: "amount",
        description: "How many cookies do you wanna eat?",
        required: false,
        type: "INTEGER"
    }],
    cooldown: 30,
    run: async(client, interaction, data) => {
        try {
            const itemID = interaction.options.getString("item")

            const itemFiles = await globPromise(
                `${process.cwd()}/items/*.js`
            );

            itemFiles.map((value) => {
                const file = require(value);
                if (!file.name) return;
                client.items.set(file.name, file);
            });

            const cmd = require(`../../items/${itemID}.js`)

            await cmd.run(client, interaction, data).catch(e => {})
        } catch (e) {
            console.log(e)
        }
    }
}
module.exports = {
    run: async(client, interaction, data) => {
        data.user.timeDoublePay = Date.now()
        await data.user.save()
    }
}
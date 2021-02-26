import Client from '../lib/Client'
module.exports = {
    name: 'status',
    delay: "30m",
    runOnStart: true,
    awaitReady: true,
    async execute(client: Client) {
        const strin = `Prefix ${client.setting.prefix} or mention me`
        client.user.setActivity(strin, { type: 'PLAYING' })
    }
}
module.exports = {
    name: 'rpc',
    delay: "30m",
    runOnStart: true,
    awaitReady: true,
    execute(client) {
        if (client.setting.rpc.on == true) {
            const clientId = "795717859170844673"
            const DiscordRPC = require("discord-rpc")
            DiscordRPC.register(clientId);

            const rpc = new DiscordRPC.Client({ transport: 'ipc' });
            rpc.login({ clientId })
            rpc.on('ready', () => {
                rpc.setActivity({
                    buttons: client.setting.rpc.activity.buttons,
                    largeImageKey: client.setting.rpc.activity.assets.large_image,
                    largeImageText: client.setting.rpc.activity.assets.large_text,
                    smallImageKey: "robot",
                    smallImageText: "why are you looking here invite it already",
                    state: 'Invite MALIL for cookies',
                    instance: false,
                })
            });

            rpc.login({ clientId }).catch(console.error);
        }
    }
}
module.exports = {
    name: 'rpc',
    delay: "30m",
    runOnStart: true,
    execute(client) {
        if (client.setting.rpc.on == true) {
            const rpc = require("discord-rpc")
            const rpcClient = new rpc.Client({ transport: 'ipc' })
            rpcClient.on('ready', () => {
                rpcClient.request('SET_ACTIVITY', {
                    pid: process.pid,
                    activity: {

                        details: client.setting.rpc.activity.details,
                        assets: {
                            large_image: client.setting.rpc.activity.assets.large_image,
                            large_text: client.setting.rpc.activity.assets.large_text
                        },
                        buttons: client.setting.rpc.activity.buttons
                    }
                })
            })
            rpcClient.login({ clientId: "795717859170844673" }).catch(console.error);
        }
    }
}
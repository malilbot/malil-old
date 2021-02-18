module.exports = {
    name: 'github',
    delay: "30m",
    runOnStart: true,
    awaitReady: true,
    async execute(client) {
        client.user.setPresence({
            activity: {
                name: "Prefix * or @ me",
                type: "PLAYING",
                url: null
            }
        });
    }
}
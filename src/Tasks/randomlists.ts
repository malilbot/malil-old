module.exports = {
    name: 'botlists',
    delay: "4h",
    async execute(client) {
        if (client.user.id !== "749020331187896410") return;
        client.botlists.post()
    },
};

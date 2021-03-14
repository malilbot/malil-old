import { GuildMember, TextChannel } from "discord.js";
module.exports = {
    name: "sweep",
    delay: "30m",
    runOnStart: false,
    awaitReady: false,
    async execute(client) {
        console.log("[ SWEEPING CACHE ]");
        client.guilds.cache.forEach((guild) => {
            guild.members.cache.sweep((member: GuildMember) => member.id != client.user?.id);
            guild.presences.cache.sweep(() => true);
        });
        client.users.cache.sweep((user) => user.id != client.user?.id);
    },
};

import { GuildMember } from "discord.js"
module.exports = {
    name: 'sweep',
    delay: "30m",
    runOnStart: false,
    awaitReady: false,
    execute(client) {
        client.logger.info("[ SWEEPING CACHE ]")
        client.guilds.cache.forEach((guild) => {
            guild.members.cache.sweep(
                (member: GuildMember) =>
                    member.id != client.user?.id
            );
            guild.presences.cache.sweep(() => true);
        });
        client.users.cache.sweep((user) => user.id != client.user?.id);
    },
};

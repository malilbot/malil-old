import { GuildMember, TextChannel, Guild, User } from "discord.js";
module.exports = {
	name: "sweep",
	delay: "30m",
	runOnStart: false,
	awaitReady: false,
	async execute(client) {
		client.logger.info("[ SWEEPING CACHE ]");
		client.guilds.cache.forEach((guild: Guild) => {
			guild.members.cache.sweep((member: GuildMember) => member.id != client.user?.id);
			guild.presences.cache.sweep(() => true);
		});
		client.users.cache.sweep((user: User) => user.id != client.user?.id);
	}
};

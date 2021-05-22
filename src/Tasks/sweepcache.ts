import { GuildMember, Guild, User } from "discord.js";
import { Task } from "../Classes/TaskHandler";
export default class extends Task {
	constructor() {
		super("sweep", {
			delay: 200,
			runOnStart: false,
		});
	}
	async exec(client) {
		client.logger.info("[ SWEEPING CACHE ]");
		client.guilds.cache.forEach((guild: Guild) => {
			guild.members.cache.sweep((member: GuildMember) => member.id != client.user?.id);
			guild.presences.cache.sweep(() => true);
		});
		client.users.cache.sweep((user: User) => user.id != client.user?.id);
	}
}

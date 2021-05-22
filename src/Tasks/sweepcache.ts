import { GuildMember, Guild, User } from "discord.js";
import { Task } from "../Classes/TaskHandler";

export default class extends Task {
	constructor() {
		super("sweep", {
			delay: 1800000,
			runOnStart: false,
		});
	}
	exec(): void {
		this.client.logger.info("[ SWEEPING CACHE ]");
		this.client.guilds.cache.forEach((guild: Guild) => {
			guild.members.cache.sweep((member: GuildMember) => member.id != this.client.user?.id);
			guild.presences.cache.sweep(() => true);
		});
		this.client.users.cache.sweep((user: User) => user.id != this.client.user?.id);
	}
}

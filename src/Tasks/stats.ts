import { main, sec } from "../Lib/Utils";
let curStats = [];
const CurStats = [];
import { Task } from "../Classes/TaskHandler";

export default class extends Task {
	constructor() {
		super("stats", {
			delay: 1800000,
			runOnStart: false,
		});
	}
	async exec(): Promise<void> {
		const clientGuilds = this.client.guilds.cache.size;
		const clientChannels = this.client.guilds.cache.reduce((a, b) => a + b.channels.cache.size, 0);
		const clientMembers = this.client.guilds.cache.reduce((a, b) => a + b.memberCount, 0);
		if (curStats == [clientChannels, clientGuilds]) return;
		curStats = [clientChannels, clientGuilds];
		if (this.client.shard.ids.length == 1) {
			this.client.logger.verbose(main(`[ CHANNELS ] ${sec(clientChannels)}`));
			this.client.logger.verbose(main(`[ MEMBERS  ] ${sec(clientMembers)}`));
			this.client.logger.verbose(main(`[ GUILDS   ] ${sec(clientGuilds)}`));
		} else {
			// prettier-ignore
			const totalGuilds = await this.client.shard.fetchClientValues("guilds.cache.size").then((serv) => serv.reduce((acc, guildCount) => acc + guildCount, 0));
			// prettier-ignore
			const totalMembers = await this.client.shard
				.broadcastEval("this.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)")
				.then((member) => member.reduce((acc, memberCount) => acc + memberCount, 0));
			// prettier-ignore
			const totalChannels = await this.client.shard
				.broadcastEval("this.guilds.cache.reduce((acc, guild) => acc + guild.channels.cache.size, 0)")
				.then((channel) => channel.reduce((acc, channelCount) => acc + channelCount, 0));
			if (this.client.shard.ids[0] == 0) {
				if (CurStats == [totalGuilds, totalChannels]) return;
				CurStats == [totalGuilds, totalChannels];
				this.client.logger.verbose(main(`[ TOTAL CHANNELS ] ${sec(totalChannels)}`));
				this.client.logger.verbose(main(`[ TOTAL MEMBERS  ] ${sec(totalMembers)}`));
				this.client.logger.verbose(main(`[ TOTAL GUILS    ] ${sec(totalGuilds)}`));
			}
			this.client.logger.verbose(main(`[ CHANNELS ] ${sec(clientChannels)}`));
			this.client.logger.verbose(main(`[ MEMBERS  ] ${sec(clientMembers)}`));
			this.client.logger.verbose(main(`[ GUILDS   ] ${sec(clientGuilds)}`));
		}
	}
}

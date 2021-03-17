import { main, sec } from "../lib/Utils";
const { log } = console;
let curStats = [];
const CurStats = [];
module.exports = {
	name: "stats",
	delay: "30m",
	runOnStart: false,
	awaitReady: false,
	async execute(client) {
		const clientGuilds = client.guilds.cache.size;
		const clientChannels = client.guilds.cache.reduce((a, b) => a + b.channels.cache.size, 0);
		const clientMembers = client.guilds.cache.reduce((a, b) => a + b.memberCount, 0);
		if (curStats == [clientChannels, clientGuilds]) return;
		curStats = [clientChannels, clientGuilds];
		if (client.shard.ids.length == 1) {
			log(main(`[ CHANNELS ] ${sec(clientChannels)}`));
			log(main(`[ MEMBERS  ] ${sec(clientMembers)}`));
			log(main(`[ GUILDS   ] ${sec(clientGuilds)}`));
		} else {
			// prettier-ignore
			const totalGuilds = await client.shard.fetchClientValues('guilds.cache.size').then(serv => serv.reduce((acc, guildCount) => acc + guildCount, 0))
			// prettier-ignore
			const totalMembers = await client.shard.broadcastEval('guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)').then(member => member.reduce((acc, memberCount) => acc + memberCount, 0))
			// prettier-ignore
			const totalChannels = await client.shard.broadcastEval('guilds.cache.reduce((acc, guild) => acc + guild.channels.cache.size, 0)').then(channel => channel.reduce((acc, channelCount) => acc + channelCount, 0))
			// prettier-ignore
			if (client.shard.ids[0] == 0) {
				if(CurStats == [totalGuilds, totalChannels]) return
				CurStats == [totalGuilds, totalChannels]
                log(main(`[ TOTAL CHANNELS ] ${sec(totalChannels)}`))
                log(main(`[ TOTAL MEMBERS  ] ${sec(totalMembers)}`))
                log(main(`[ TOTAL GUILS    ] ${sec(totalGuilds)}`))
            }
			log(main(`[ CHANNELS ] ${sec(clientChannels)}`));
			log(main(`[ MEMBERS  ] ${sec(clientMembers)}`));
			log(main(`[ GUILDS   ] ${sec(clientGuilds)}`));
		}
	},
};

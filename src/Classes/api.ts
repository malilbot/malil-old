import Client from "./Client";
import Fastify from "fastify";
import { TextChannel } from "discord.js";
export = (client: Client): void => {
	const fastify = Fastify({ logger: false });
	const start = async () => {
		fastify.get("/", async () => {
			const guilds = client.guilds.cache.size;
			const channels = client.guilds.cache.reduce((a, b) => a + b.channels.cache.size, 0);
			const members = client.guilds.cache.reduce((a, b) => a + b.memberCount, 0);
			const commands = client.commandHandler.modules.size;
			const listeners = client.listenerHandler.modules.size;
			const inhibitors = client.inhibitorHandler.modules.size;
			const rawmessages = client.channels.cache.map((c) => {
				if (c.type == "text") return (c as TextChannel).messages.cache.map(() => 1);
				else return [0];
			});
			const messagesRaw = [].concat([], ...rawmessages);
			let messages = 0;
			for (let index = 0; index < messagesRaw.length; index++) {
				messages = messages + messagesRaw[index];
			}
			return { guilds, channels, members, commands, listeners, inhibitors, messages };
		});
		try {
			await fastify.listen(3000);
		} catch (err) {
			fastify.log.error(err);
			process.exit(1);
		}
	};
	start();
};

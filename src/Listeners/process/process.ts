import { Listener } from "discord-akairo";
import { Message, TextChannel, MessageEmbed } from "discord.js";
import Client from "../../lib/Client";
import { unindent } from "common-tags";
import { hst } from "../../lib/Utils";
export default class process extends Listener {
	client: Client;
	public constructor(client: Client) {
		super("process", {
			emitter: "process",
			event: "unhandledRejection",
			category: "process",
		});
		this.client = client;
	}
	/*
    async exec(error: Error) {
        this.client.logger.info(error.stack)
        const channel = await this.client.channels.fetch("815328569051971595");
        (channel as TextChannel).send(error.stack)
    }
    */
	public async exec(error: Error, promise: Promise<unknown>) {
		this.client.logger.info(error.stack);
		try {
			const channel = await this.client.channels.fetch(this.client.consts.errChannel);
			await (channel as TextChannel).send(
				new MessageEmbed({
					title: "Unhandled promise rejection",
					description: `Promise \`${promise}\` threw an error, unhandled.\n` + `Stack: ${await hst(error.stack)}`,
				})
			);
		} catch (e) {}
	}
}

import { Listener } from "discord-akairo";
import { TextChannel, MessageEmbed, WebhookClient } from "discord.js";
import Client from "../../Classes/Client";
import { hst } from "../../Lib/Utils";
export default class process extends Listener {
	client: Client;
	constructor(client: Client) {
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
	async exec(error: Error, promise: Promise<unknown>): Promise<void> {
		this.client.logger.info(error.stack);
		try {
			const webhookCLient = new WebhookClient(this.client.credentials.webhook.id, this.client.credentials.webhook.token);
			const hstEmbed = this.client.util
				.embed()
				.addField("Promise rejection", `Promise \`${promise}\` threw an error, unhandled.\n` + `Stack: ${await hst(error.stack)}`)
				.setColor("ORANGE");
			const nrm = this.client.util
				.embed()
				.setColor("GREEN")
				.addField("Error", "```js\n" + `${error.stack.slice(0, 1000)}` + "```");
			webhookCLient.send({ embeds: [nrm, hstEmbed] });
		} catch (e) {
			this.client.logger.warn("Something went wrong in process: " + e.stack);
		}
	}
}

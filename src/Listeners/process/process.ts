import { Listener } from "discord-akairo";
import { WebhookClient } from "discord.js";
import { hst } from "../../Lib/Utils";
export default class process extends Listener {
	constructor() {
		super("process", {
			emitter: "process",
			event: "unhandledRejection",
			category: "process",
		});
	}
	async exec(error: Error, promise: Promise<unknown>): Promise<void> {
		this.client.logger.error(error.stack);
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
			this.client.logger.error("Something went wrong in process: " + e.stack);
		}
	}
}

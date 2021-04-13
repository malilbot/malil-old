import { Listener, Command } from "discord-akairo";
import { Interaction } from "discord.js";
import { main, sec, fourth, a1 } from "../../Lib/Utils";
import Client from "../../Classes/Client";

export default class SlashStarted extends Listener {
	public constructor(client: Client) {
		super("SlashStarted", {
			emitter: "slashHandler",
			event: "slashStarted",
			category: "slashHandler",
		});
		this.client = client;
	}

	exec(message: Interaction, command: Command): void {
		this.client.gp.math("commands", "+", 1);
		const cmd = main(command);
		const usr = sec(message.user.tag) + " " + fourth(message.user.id);
		const gld = sec(message.guild.name) + " " + fourth(message.guild.id);
		this.client.logger.info(a1("[ SlASH RAN ] ") + cmd + a1(" [ USER ] ") + usr + a1(" [ GUILD ] ") + gld);
	}
}

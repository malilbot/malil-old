/*
import { Listener } from "discord-akairo";
import Client from "../../client/Client";

export default class ConsoleListener extends Listener {
	public constructor() {
		super("Console", {
			emitter: "stdin",
			event: "line",
			category: "client"
		});
	}

	public exec(line: string): void {
		const bot = this.client;
		if (line.startsWith("eval ")) {
			try {
				const input = line.replace("eval ", "");
				const output = eval(input);
				console.log(output);
			} catch (e) {
				console.error(e);
			}
		} else if (line.startsWith("reload ")) {
			try {
				this.handler.reloadAll();
			} catch (e) {
				console.error(e);
			}
		}
	}
}
*/

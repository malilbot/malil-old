import { Task } from "../Classes/TaskHandler";
export default class extends Task {
	constructor() {
		super("botlists", {
			delay: 14400000,
			runOnStart: false,
		});
	}
	async exec(client) {
		console.log("task ran");
		if (client.user.id !== "749020331187896410") return;
		client.botLists.post();
	}
}

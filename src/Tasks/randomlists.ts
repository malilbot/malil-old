import { Task } from "../Classes/TaskHandler";
export default class extends Task {
	constructor() {
		super("botlists", {
			delay: 14400000,
			runOnStart: false,
		});
	}
	exec(): Promise<void> {
		console.log("task ran");
		if (this.client.user.id !== "749020331187896410") return;
		/*@ts-ignore - reeeeee*/
		this.client.botLists.post();
	}
}

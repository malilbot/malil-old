import { AkairoModule, AkairoHandler, LoadPredicate, AkairoClient } from "discord-akairo";

import { Collection } from "discord.js";
export class Task extends AkairoModule {
	delay: number | bigint;
	runOnStart: boolean;
	constructor(id: string, { category, delay, runOnStart }: { category?: string; delay?: number | bigint; runOnStart?: boolean }) {
		super(id, { category });

		this.delay = delay;

		this.runOnStart = runOnStart;
	}
	/*
		name: "sweep",
	delay: "30m",
	runOnStart: false,
	awaitReady: false*/

	exec(client: AkairoClient): void {
		throw new Error("NOT_IMPLEMENTED");
	}
}

export class TaskHandler extends AkairoHandler {
	modules: Collection<string, Task>;
	constructor(
		client: AkairoClient,
		{
			directory,
			classToHandle = Task,
			extensions = [".js", ".ts"],
			automateCategories,
			loadFilter,
		}: { directory: string; classToHandle?; extensions?: string[]; automateCategories?: boolean; loadFilter?: LoadPredicate }
	) {
		if (!(classToHandle.prototype instanceof Task || classToHandle === Task)) {
			throw new Error("INVALID_CLASS_TO_HANDLE");
		}

		super(client, {
			directory,
			classToHandle,
			extensions,
			automateCategories,
			loadFilter,
		});
	}

	startAll(): void {
		this.client.on("ready", () => {
			this.modules.forEach((task) => {
				if (task.runOnStart) task.exec(this.client);
				if (task.delay) {
					setInterval(() => {
						task.exec(this.client);
					}, Number(task.delay));
				}
			});
		});
	}
	/*
for (const file of taskfiles) {
// 			const task = require(join(__dirname, "..", "Tasks/" + file));
// 			if (task?.awaitReady == true) {
// 				this.client.on("ready", () => {
// 					if (task?.runOnStart == true) task.execute(this.client);
// 				});
// 			} else if (task?.runOnStart == true) task.execute(this.client);

// 			if (task?.delay) {
// 				setInterval(() => {
// 					task?.execute(this.client);
// 				}, ms(task?.delay));
// 			}
// 		}
	*/
}

// export default class TaskHandler {
// 	directory: string;
// 	client: client;

// 	constructor(client, { directory }) {
// 		this.client = client;
// 		this.directory = directory;
// 	}
// 	loadall() {
// 		const taskfiles = readdirSync(join(__dirname, "..", "Tasks")).filter((file) => file.endsWith(".js"));
// 		for (const file of taskfiles) {
// 			const task = require(join(__dirname, "..", "Tasks/" + file));
// 			if (task?.awaitReady == true) {
// 				this.client.on("ready", () => {
// 					if (task?.runOnStart == true) task.execute(this.client);
// 				});
// 			} else if (task?.runOnStart == true) task.execute(this.client);

// 			if (task?.delay) {
// 				setInterval(() => {
// 					task?.execute(this.client);
// 				}, ms(task?.delay));
// 			}
// 		}
// 	}
// }

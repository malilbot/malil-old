import Client from "../lib/Client";
module.exports = {
	name: "status",
	delay: "3h",
	runOnStart: false,
	awaitReady: false,
	async execute(client: Client) {
		const strin = `Prefix ${client.settings.prefix} or mention me`;
		//const strin = `MAINTENCE MODE DATA WONT BE SAVED`;
		client.user.setActivity(strin, { type: "PLAYING" });
	}
};

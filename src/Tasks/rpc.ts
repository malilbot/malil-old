import * as DiscordRPC from "discord-rpc";
import { main, sec, third, fourth, a1, split } from "../lib/Utils";
module.exports = {
	name: "rpc",
	delay: "30m",
	runOnStart: true,
	awaitReady: true,
	execute(client) {
		if (client.settings.rpc == true) {
			//malil
			try {
				client.logger.info(fourth("[ CONNECTING TO RPC ]"));
				const clientId = "795717859170844673"; // bot
				//const clientId = "821104492476891218"; // sway
				DiscordRPC.register(clientId);

				const rpc = new DiscordRPC.Client({ transport: "ipc" });
				rpc.login({ clientId });
				rpc.on("ready", () => {
					rpc.setActivity({
						buttons: [
							//prettier-ignore
							{ label: 'Support', url: 'https://discord.gg/mY8zTARu4g' },
							//prettier-ignore
							//{ label: 'google', url: 'https://google.com' },
							{ label: 'invite', url:'https://discord.com/oauth2/authorize?client_id=749020331187896410&scope=bot&permissions=117824', },
						],
						largeImageKey: "pfp2",
						largeImageText: "CODING BOT",
						smallImageKey: "betapfp2",
						smallImageText: "why are you looking here invite it already",
						state: "Invite MALIL for cookies",
						instance: false,
						//largeImageKey: "sway2",
					});
					client.logger.info(fourth("[ CONNECTED TO RPC ]"));
				});
			} catch (e) {
				client.logger.info(fourth("[ COULD NOT CONNECT TO RPC ]"));
			}
		}
	},
};

// import type { Message } from "discord.js";
// import { sec, fourth } from "./Utils";
// import { exec } from "child_process";
// export = async (message: Message) => {
// 	if (message?.channel?.id == "818158216156413973") {
// 		exec("git pull", async (e, stdout) => {
// 			if (!stdout.includes("Already up to date.")) {
// 				(message.client as any).logger.verbose("[ PULLING NEW COMMIT ]");
// 				message.react("824673035499733022");
// 				exec("yarn rm", () => {
// 					exec("yarn tsc", async () => {
// 						exec("pm2 restart all", async () => {
// 							(message.client as any).logger.verbose("[ RESTARTING ]");
// 						});
// 					});
// 				});
// 			}
// 		});
// 	} else if (message?.channel?.id == "823935750168117312") {
// 		if (message.webhookID) {
// 			(message.client as any).gp.math("commands", "+", 1);
// 			if (!message.content.startsWith("{")) return;

// 			const res = JSON.parse(message.content);
// 			const member = await (message.client as any).users.fetch(res.user);
// 			if (!member) return (message.client as any).logger.info("WHATTT?");
// 			(message.client as any).logger.info(fourth("[ VOTE ] ") + sec(`${member.tag} (${member.id})`));
// 			//@ts-ignore
// 			const votes = message.client.increaseVotes(member.id, 1);
// 			//@ts-ignore

// 			const iq = message.client.increaseIq(member.id, res.isWeekend ? 2 : 1);

// 			message.channel.send(
// 				(message.client as any).util
// 					.embed()
// 					.setAuthor(`vote from ${member.tag}`, member.avatarURL())
// 					.setDescription(`**iq**: ${await iq}\n**votes**: ${await votes}`)
// 					.setTimestamp()
// 					.setColor((message.client as any).colors.blue)
// 			);
// 		}
// 	}
// };

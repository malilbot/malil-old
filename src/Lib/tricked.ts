import type { Message } from "discord.js";
import { InterfaceClient, sec, fourth } from "./Utils";
import { exec } from "child_process";
export = async (message: Message) => {
	if (message?.channel?.id == "818158216156413973") {
		exec("git pull", async (e, stdout) => {
			if (!stdout.includes("Already up to date.")) {
				(message.client as InterfaceClient).logger.verbose("[ PULLING NEW COMMIT ]");
				message.react("824673035499733022");
				exec("yarn rm", () => {
					exec("npx tsc", async () => {
						(message.client as InterfaceClient).logger.verbose("[ RESTARTING ]");
						(message.client as InterfaceClient).shard.respawnAll();
					});
				});
			}
		});
	} else if (message?.channel?.id == "823935750168117312") {
		if (message.webhookID) {
			(message.client as InterfaceClient).gp.math("commands", "+", 1);
			if (!message.content.startsWith("{")) return;

			const res = JSON.parse(message.content);
			const member = await (message.client as InterfaceClient).users.fetch(res.user);
			if (!member) return (message.client as InterfaceClient).logger.info("WHATTT?");
			(message.client as InterfaceClient).logger.info(fourth("[ VOTE ] ") + sec(`${member.tag} (${member.id})`));

			const votes = (message.client as InterfaceClient).db.increaseVotes(member.id, 1);
			const iq = (message.client as InterfaceClient).db.increaseIq(member.id, res.isWeekend ? 2 : 1);

			message.channel.send(
				(message.client as any).util
					.embed()
					.setAuthor(`vote from ${member.tag}`, member.avatarURL())
					.setDescription(`**iq**: ${iq}\n**votes**: ${votes}`)
					.setTimestamp()
					.setColor((message.client as InterfaceClient).colors.blue)
			);
		}
	}
};

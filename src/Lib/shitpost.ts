import { superUsers } from "./config";
import C from "centra";
const talkedRecently = new Set();
export = async (message) => {
	message.client.gp.math("commands", "+", 1);
	if (!message.system) {
		if (!talkedRecently.has(message.author.id)) {
			if (message.content[0] !== "#") {
				let at: string;
				message?.attachments?.forEach((ata) => (at = ata.name));
				message.client.logger.info(`[ MSG ${message.author.tag} ] ${message.content}`);
				const question = message.content.replace(/ /gim, "%20");
				const reply = await (await (await C(`https://alexa-bot-api-web-server.vercel.app/api/alexa?stimulus=${question || at || "OOOOGAAA BOOGA"}`).send()).json()).reply;
				message.client.logger.info(`[ ${message.guild.name} ][ REPLY ] ${reply}`);
				message.reply(reply, { allowedMentions: { repliedUser: false } });
			}
			if (superUsers.includes(message.author.id)) return;
			talkedRecently.add(message.author.id);
			setTimeout(() => {
				talkedRecently.delete(message.author.id);
			}, 2000); //2 seconds
		}
	}
};

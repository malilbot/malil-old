import { Command } from "discord-akairo";
import { MessageEmbed, Message } from "discord.js";

export default class RulesCommand extends Command {
	public constructor() {
		super("rules", {
			aliases: [
				"rules"
			],
			category: "Moderation",
			quoted: true,
			args: [
				{
					id: "args",
					type: "array",
					match: "rest"
				}
			],
			description: {
				content: "A easy way to get some rules in your server",
				usage: "rules < number >",
				example: [
					"Rules 1",
					"rules 2",
					"rules 3"
				]
			},
			ratelimit: 3,
			channel: "guild"
		});
	}

	public async exec(message: Message, { args }) {
		if (
			!message.member.hasPermission([
				"ADMINISTRATOR"
			])
		)
			return message.channel.send(`You need to be a admin to use this command.`);
		if (args == "1") {
			const embed = new MessageEmbed()
				.setDescription(
					`
**1.) Follow Discord's TOS**

**2.) Be Respectful**
Racist, sexist, homophobic, xenophobic, transphobic, hate speech, slurs, or any other derogatory, toxic, or discriminatory behavior will not be tolerated.

**3.) No Spamming**
This includes any messages that do not contribute to the conversation, repeated messages, randomly tagging users, and chat flood.

**4.) English**
The primary language of the server is English, please keep all discussions in English.

**5.) Safe for Work**
Please keep nsfw content out of this discord. Avoid borderline images.

**6.) No Advertising**
Do not promote anything without prior approval from a mod. This includes DM advertising.

**7.) Impersonation**
Do not try to appear as someone else.

**8.) Swearing**
Swearing is allowed only when not used as an insult.

**10.) No Backseat Moderating**

**11.) Staff may moderate at their discretion**
If there are loopholes in our rules, the staff team may moderate based on what they deem appropriate. The staff team holds final discretion.`
				)
				.setColor("BLUE")
				.setTimestamp();
			message.reply(embed);
		} else if (args == "2") {
			const embed = new MessageEmbed()
				.setDescription(
					`**Rules of the server**\n
If you violate any of these rules you may be punished\n
**General rules**
No dm advertising
Be respectful
No bot spamming`
				)
				.setTimestamp()
				.setColor("RED");
			message.channel.send(embed);
		} else if (args == "3") {
			const embed = new MessageEmbed()
				.setDescription(
					`**Guidelines**
:one: Read all pinned messages and search the chat before you ask any questions.

:two: Follow the topic of each channel and make your posts in the correct channels.

:three: Any issues you may have with a user should be reported to a admin and will be dealt with accordingly.
Rules
:one: No spamming.

:two: No advertising.

:three: No bigotry (racism, sexism etc.).

:four: Bot commands can only be used sparingly (no spamming them) outside #commands, #support and #voice.

:five: If you break any of these rules you will get warned, upon getting 3 strikes you will either be kicked or banned depending on the reason of your warnings.

:six: Absolutely no explicit content in any channel.(porn gore etc.)

And lastly, abide by all rules set out in the Discord ToS and Discord Guidelines`
				)
				.setColor("GREEN")
				.setTimestamp();
			message.channel.send(embed);
		} else message.reply("choose from 1 to 3");
	}
}
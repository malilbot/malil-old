const Discord = require("discord.js");
const { ClientUser } = require("discord.js");
const client = new Discord.Client();
module.exports = {
	aliases: [
		"u"
	], // Optional
	callback: ({ message }) => {
		const Embed = new Discord.MessageEmbed()
			.setColor("#03fc49")
			.setThumbnail(client.user.displayAvatarURL())
			.addFields({
				name: client.user.name + "s info",
				value: "h" + "sf"
			});
		message.reply(Embed);
	}
};

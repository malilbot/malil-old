import { Command } from "discord-akairo";
import { MessageEmbed, Message } from "discord.js";
import { getLyrics, getSong } from "genius-lyrics-api";

export default class lyricsCommand extends Command {
	public constructor() {
		super("lyrics", {
			aliases: [
				"lyrics",
				"lyc"
			],
			category: "Info",
			quoted: true,
			args: [
				{
					id: "args",
					type: "array",
					match: "rest"
				}
			],
			description: {
				content: "Get the lyrics of a song",
				usage: "lyrics",
				example: [
					"lyrics"
				]
			},
			ratelimit: 1,
			channel: "guild"
		});
	}

	public async exec(message: Message, { args }) {
		function cutString(s, n) {
			/* ----------------------- */
			const cut = s.indexOf(" ", n);
			if (cut == -1) return s;
			return s.substring(0, cut);
		}
		const options = {
			apiKey: this.client.setting.genius,
			title: args,
			artist: "",
			optimizeQuery: true
		};

		getSong(options).then((song) => {
			if (!song) return message.reply("song not found F");
			let lyrics = song.lyrics;

			if (song.lyrics.length > 1024) {

				/* ----------------------- */
				lyrics = cutString(lyrics, 1000);
				lyrics += "....";
			}
			lyrics = lyrics
				.replace(/nigger/g, "n-")
				.replace(/nigga/g, "n-")
				.replace(/\[.*?\]/g, "")
				.replace(/\n\n/g, "\n");
			// prettier-ignore

			message.util.reply(new MessageEmbed().setTitle(args).setURL(song.url).addField("lyrics", lyrics), { allowedMentions: { repliedUser: false } });
		});
	}
}

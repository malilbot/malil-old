import Command from "../../Classes/malilCommand";
import { MessageEmbed, Message, CommandInteraction } from "discord.js";
import { GetSong } from "../../Lib/Utils";

export default class lyricsCommand extends Command {
	public constructor() {
		super("lyrics", {
			aliases: ["lyrics", "lyc"],
			category: "Info",
			quoted: true,
			args: [
				{
					id: "args",
					type: "array",
					match: "rest",
				},
			],
			description: {
				content: "Get the lyrics of a song",
				example: ["lyrics idc", "lyrics venom"],
			},
			options: [
				{
					type: 3,
					name: "song",
					description: "title of the song you want to search",
					required: true,
				},
				{
					type: 3,
					name: "artist",
					description: "The artist of the song",
					required: false,
				},
			],
			clientPermissions: ["SEND_MESSAGES"],
			ratelimit: 1,
			channel: "guild",
		});
	}

	public async exec(message: Message, { args }): Promise<void> {
		function cutString(s, n) {
			/* ----------------------- */
			const cut = s.indexOf(" ", n);
			if (cut == -1) return s;
			return s.substring(0, cut);
		}
		const options = {
			apiKey: this.client.credentials.genius,
			title: args,
			artist: "",
			optimizeQuery: true,
		};

		GetSong(options).then((song) => {
			if (!song) return message.util.send("song not found F");
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
			//{ allowedMentions: { repliedUser: false } }
			return message.util.send({ embed: new MessageEmbed().setTitle(args).setURL(song.url).addField("lyrics", lyrics), allowedMentions: { repliedUser: false } });
		});
	}
	async execSlash(message: CommandInteraction) {
		const songName = message.options[0]?.value;
		const artist = message.options[1]?.value;
		function cutString(s, n) {
			/* ----------------------- */
			const cut = s.indexOf(" ", n);
			if (cut == -1) return s;
			return s.substring(0, cut);
		}
		const options = {
			apiKey: this.client.credentials.genius,
			title: songName,
			artist: artist || "",
			optimizeQuery: true,
		};

		GetSong(options).then((song) => {
			if (!song) return message.reply("Requested song could not be found.");
			let lyrics = song.lyrics;

			if (song.lyrics.length > 1024) {
				/* ----------------------- */
				lyrics = cutString(lyrics, 1000);
				lyrics += "\n....";
			}
			lyrics = lyrics
				.replace(/nigger/g, "n-")
				.replace(/nigga/g, "n-")
				.replace(/\[.*?\]/g, "")
				.replace(/\n\n/g, "\n");
			message.reply(this.client.util.embed().setColor(this.client.colors.default).setTitle(`${songName}`).setURL(`${song.url}`).addField("lyrics", lyrics) as any);
		});
	}
}

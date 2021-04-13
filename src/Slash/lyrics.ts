import Command from "../Classes/SlashCommand";
import type { CommandInteraction } from "discord.js";
import { GetSong } from "../Lib/Utils";
export default class lyricsCommand extends Command {
	constructor() {
		super("lyrics", {
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
			name: "lyrics",
			description: "gets the lyrics of a song",
		});
	}

	async exec(message: CommandInteraction) {
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
			return message.reply({ embed: this.client.util.embed().setColor(this.client.colors.default).setTitle(`${songName}`).setURL(`${song.url}`).addField("lyrics", lyrics) });
		});
	}
}

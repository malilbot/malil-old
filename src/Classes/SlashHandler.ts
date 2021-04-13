import { AkairoClient, AkairoHandler } from "discord-akairo";
import type { AkairoHandlerOptions } from "discord-akairo";
import type { Collection, Interaction } from "discord.js";
import type SlashCommand from "./SlashCommand";

/**
 * Handles incoming command interactions.
 */
export default class SlashHandler extends AkairoHandler {
	/**
	 * Command interactions loaded, mapped by ID to Command
	 */
	modules!: Collection<string, SlashCommand>;

	/**
	 * @param client - The client that this handler is for
	 * @param options - The handler options
	 */
	constructor(client: AkairoClient, options: AkairoHandlerOptions) {
		super(client, options);
		this.client.on("interaction", this.handle.bind(this));
	}

	/**
	 * Handles an interaction.
	 * @param interaction - Interaction to handle
	 */
	async handle(interaction: Interaction) {
		if (!interaction.isCommand()) return;

		if (!interaction.guildID) {
			return interaction.reply("Slash Commands dont work in dms", {
				ephemeral: true,
			});
		}

		const command = this.modules.get(interaction.commandName);

		if (!command) {
			return interaction.reply(`**${interaction.commandName}** Was not found`, {
				ephemeral: true,
			});
		}

		if (command.ownerOnly && !this.client.isOwner(interaction.user)) {
			return interaction.reply(`**${interaction.commandName}** Is owner only`, {
				ephemeral: true,
			});
		}

		try {
			this.emit("slashStarted", interaction, command);
			await command.exec(interaction);
		} catch (error: unknown) {
			console.error(error);

			const reply = interaction.deferred ? interaction.editReply : interaction.reply;
			reply(`Something went wrong trying to run \`${interaction.commandName}\`!`, {
				ephemeral: true,
			});
		}
	}
}

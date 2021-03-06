/**
 * How to contribute to languages?: You can create a new file in this folder with the language you want to add and just copy
 * the format as shown here for your language or edit a already existing language to add translations or fix typos
 */
const c = {
	no: "<:no:838017092216946748>",
};
export default {
	MEMBER_KICK: (user: string, reason: string): string => `${user} was kicked for: ${reason}`,
	NO_MODULE_DENO: `${c.no} Please provide a valid deno package`,
	NO_MODULE_NODE: `${c.no} Please provide a valid node package`,
	NO_DESCRIPTION: `${c.no} No description provided`,
	NOT_FOUND: (thing: string): string => `${c.no} ${thing} not found`,
	DENO_DESCRIPTION_CONTENT: "Find a deno module",
	DENO_DESCRIPTION_EXAMPLE: ["deno discorddeno"],
	NO: "?",
	ALIAS: "Aliases",
	DESCRIPTION: "Description",
	EXAMPLES: "Examples",
	/**Command descriptions */
	AMERICA_DESCRIPTION_CONTENT: "America!",
	AMERICA_DESCRIPTION_EXAMPLE: ["america", "america 336465356304678913"],
	CLAP_DESCRIPTION_CONTENT: "Clap on some text",
	CLAP_DESCRIPTION_EXAMPLE: ["clap hello world"],
	"8BALL_DESCRIPTION_CONTENT": "ask the magic 8ball",
	"8BALL_DESCRIPTION_EXAMPLE": ["8ball is malil best bot?"],
	FACT_DESCRIPTION_CONTENT: "Finds a random fact from the internet",
	FACT_DESCRIPTION_EXAMPLE: ["fact"],
	IQ_DESCRIPTION_CONTENT: "uses advanced math to calculate your iq",
	IQ_DESCRIPTION_EXAMPLE: ["iq 336465356304678913"],
	MOCK_DESCRIPTION_CONTENT: "mock a user",
	MOCK_DESCRIPTION_EXAMPLE: ["mock hello world"],
	UWU_DESCRIPTION_CONTENT: "uwu",
	UWU_DESCRIPTION_EXAMPLE: ["uwu"],
	YOUTUBE_DESCRIPTION_CONTENT: "start a youtube together session in a channel",
	YOUTUBE_DESCRIPTION_EXAMPLE: ["youtube #chill"],
	FEDORA_DESCRIPTION_CONTENT: "Adds a fedora to your",
	FEDORA_DESCRIPTION_EXAMPLE: ["fedora 336465356304678913"],
	ACI_DESCRIPTION_CONTENT: "Makes your avatar or picture itno a aci",
	ACI_DESCRIPTION_EXAMPLE: ["aci 336465356304678913"],
	GITHUB_DESCRIPTION_CONTENT: "Watches github releases from a github repo",
	GITHUB_DESCRIPTION_EXAMPLE: [
		"github add < github repo >",
		"github set < channel id >",
		"github delete",
		"github list",
		"github add https://github.com/malilbot/malilbot.github.io",
		"github set #general",
	],
	HELP_DESCRIPTION_CONTENT: "Sends the help command",
	HELP_DESCRIPTION_EXAMPLE: ["help ban", "h ban"],
	PING_DESCRIPTION_CONTENT: "pong!",
	PING_DESCRIPTION_EXAMPLE: ["ping"],
	RANK_DESCRIPTION_CONTENT: "Allows you to join a rank",
	RANK_DESCRIPTION_EXAMPLE: ["rank verified"],
	SHORT_DESCRIPTION_CONTENT: "Shortens your links",
	SHORT_DESCRIPTION_EXAMPLE: ["short https://google.com"],
	USER_DESCRIPTION_CONTENT: "Sends some information about	a user",
	USER_DESCRIPTION_EXAMPLE: ["user 336465356304678913"],
	AVATAR_DESCRIPTION_CONTENT: "Sends the avatar of a user",
	AVATAR_DESCRIPTION_EXAMPLE: ["av 336465356304678913", "avatar 336465356304678913"],
	LYRICS_DESCRIPTION_CONTENT: "Sends the lyrics of a specified song",
	LYRICS_DESCRIPTION_EXAMPLE: ["lyrics idc"],
	SERVER_DESCRIPTION_CONTENT: "Sends basic information about the current server",
	SERVER_DESCRIPTION_EXAMPLE: ["server"],
	STATS_DESCRIPTION_CONTENT: "Sends some facts about the bot",
	STATS_DESCRIPTION_EXAMPLE: ["stats"],
	VOTE_DESCRIPTION_CONTENT: "Allows you to vote for malil",
	VOTE_DESCRIPTION_EXAMPLE: ["vote"],
	ADDRANK_DESCRIPTION_CONTENT: "Used to add a rank for users to join",
	ADDRANK_DESCRIPTION_EXAMPLE: ["addrank verified"],
	STICKER_DESCRIPTION_CONTENT: "Can be used to make malil delete every sticker",
	STICKER_DESCRIPTION_EXAMPLE: ["sticker on"],
	BAN_DESCRIPTION_CONTENT: "Used to bad users",
	BAN_DESCRIPTION_EXAMPLE: ["ban 336465356304678913 asked for it"],
	CLEAR_DESCRIPTION_CONTENT: "Clear messafes in your chat",
	CLEAR_DESCRIPTION_EXAMPLE: ["clear 20"],
	CLEARWARNS_DESCRIPTION_CONTENT: "Clear the warning of a user",
	CLEARWARNS_DESCRIPTION_EXAMPLE: ["clearwarns 336465356304678913"],
	INFRACTIONS_DESCRIPTION_CONTENT: "See the warnings/infractions of a user",
	INFRACTIONS_DESCRIPTION_EXAMPLE: ["warns 336465356304678913"],
	KICK_DESCRIPTION_CONTENT: "Used to kick users",
	KICK_DESCRIPTION_EXAMPLE: ["kick 336465356304678913 didnt ask for it but still kicked them"],
	LOCK_DESCRIPTION_CONTENT: "Lock a channel to prevent people from speaking in it",
	LOCK_DESCRIPTION_EXAMPLE: ["lock", "lock general"],
	LOGCHANNEL_DESCRIPTION_CONTENT: "ALl modlogs will be send in the specified channel",
	LOGCHANNEL_DESCRIPTION_EXAMPLE: ["logchannel #general"],
	MODONLY_ESCRIPTION_CONTENT: "Make a channel modonly, only people with manage messages can speak in these channels",
	MODONLY_DESCRIPTION_EXAMPLE: ["modonly #general"],
	MUTE_DESCRIPTION_CONTENT: "Mute a user for a specified amount of time or just forever",
	MUTE_DESCRIPTION_EXAMPLE: ["Mute 336465356304678913 1h"],
	NICK_DESCRIPTION_CONTENT: "Change the nick of a user",
	NICK_DESCRIPTION_EXAMPLE: ["Change the nick of a user"],
	REMOVERANK_DESCRIPTION_CONTENT: "Delete a rnak, users cant join ranks that are deleted",
	REMOVERANK_DESCRIPTION_EXAMPLE: ["delrank verified"],
	SLOWMODE_DESCRIPTION_CONTENT: "Change the slowmode of a channel",
	SLOWMODE_DESCRIPTION_EXAMPLE: ["sm 1h"],
	UNMUTE_DESCRIPTION_CONTENT: "Unmute a muted user",
	UNMUTE_DESCRIPTION_EXAMPLE: ["unmute 336465356304678913"],
	WARN_DESCRIPTION_CONTENT: "Warn a user for being annoying",
	WARN_DESCRIPTION_EXAMPLE: ["warn 336465356304678913"],
	MODSTATS_DESCRIPTION_CONTENT: "View the mod stats of a user 336465356304678913",
	MODSTATS_DESCRIPTION_EXAMPLE: ["modstats 336465356304678913"],
	DISABLE_DESCRIPTION_CONTENT: "Disable a command or category",
	DISABLE_DESCRIPTION_EXAMPLE: ["disable fun", "disable help"],
	CLONE_DESCRIPTION_CONTENT: "Clone emojis to your server",
	CLONE_DESCRIPTION_EXAMPLE: ["clone"],
	GIVEAWAY_DESCRIPTION_CONTENT: "Start a giveaway",
	GIVEAWAY_DESCRIPTION_EXAMPLE: ["giveaway start"],
	INVITE_DESCRIPTION_CONTENT: "Invite malil to your server,",
	INVITE_DESCRIPTION_EXAMPLE: ["invite"],
	POLL_DESCRIPTION_CONTENT: "Start a very basic poll",
	POLL_DESCRIPTION_EXAMPLE: ["poll cats good?"],
	PREFIX_DESCRIPTION_CONTENT: "Set malil's prefix",
	PREFIX_DESCRIPTION_EXAMPLE: ["prefix ;"],
	QUOTE_DESCRIPTION_CONTENT: "Quote a message",
	QUOTE_DESCRIPTION_EXAMPLE: ["quote https://discord.com/channels/781913473872560189/809070175701303356/846303720173076532"],
	RAW_DESCRIPTION_CONTENT: "View the raw content of a message",
	RAW_DESCRIPTION_EXAMPLE: ["raw :clown:"],
	GITHUBUSER_DESCRIPTION_CONTENT: "Sends some information about this github user",
	GITHUBUSER_DESCRIPTION_EXAMPLE: ["githubuser skyblockdev"],
	STARBOARD_DESCRIPTION_CONTENT: "Enable the startboard on your server",
	STARBOARD_DESCRIPTION_EXAMPLE: "starboard #starboard",
	NPM_DESCRIPTION_CONTENT: "Sends some information about a npm package",
	NPM_DESCRIPTION_EXAMPLE: ["npm discord.js"],
	LANGUAGE_DESCRIPTION_CONTENT: "Change the language of malil",
	LANGUAGE_DESCRIPTION_EXAMPLE: "lang en",
	IQTEST_DESCRIPTION_CONTENT: "Uses advanced math to decide your iq",
	IQTEST_DESCRIPTION_EXAMPLE: ["iq @user"],
	MODSTATS_ESCRIPTION_CONTENT: "View your mod stats",
	MODSTATS_ESCRIPTION_EXAMPLE: ["modstats @owner"],
	SUPPORT_DESCRIPTION_CONTENT: "official malil support server",
	SUPPORT_DESCRIPTION_EXAMPLE: ["support"],
	PAT_DESCRIPTION_CONTENT: "Pat a user",
	PAT_DESCRIPTION_EXAMPLE: ["pat @user"],
	DECODE_DESCRIPTION_CONTENT: "decode some text",
	DECODE_DESCRIPTION_EXAMPLE: ["decode some base64 stuff"],
	ENCODE_DESCRIPTION_CONTENT: "encode some text",
	ENCODE_DESCRIPTION_EXAMPLE: ["encode some base64 stuff"],
	CHANGED_LANGUAGE: (botName: string, language: string): string => `Succesfully changed ${botName} language to **${language}**`,
	CURRENT_LANGUAGE: (current: string, languages: string[]): string => `My current language is ${current}, you can choose between ${languages.map((a) => `\`${a}\``)}`,
	NO_PERMS_CLIENT: (perm: string): string => `Sorry i dont have **${perm}** permissions needed to run this command`,
	NO_PERMS_USER: (perm: string): string => `Sorry you dont have **${perm}** permissions needed to run this command`,
	MALIL_HELP_FOOTER: "@malil help [ command ] for more information on a command.",
	SHORTEN_DESCRIPTION_CONTENT: "Shorten a url",
	SHORTEN_DESCRIPTION_EXAMPLE: "short https://google.com",
};

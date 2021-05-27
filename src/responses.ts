const skytils = `807302538558308352`,
	drm = `804143990869590066`,
	dg = `781913473872560189`;
//	tricked = `748956745409232945`;

///////////////////////////////
/////////Responses/////////////
///////////////////////////////
export default [
	{
		guilds: [`${skytils}`, `${drm}`, `${dg}`],
		message: {
			content: `tested`,
		},
		triggers: [
			[`how`, `where`],
			[`how`, `is`],
		],
	},
	{
		guilds: [`${skytils}`, `${drm}`],
		message: {
			files: [`http://pays.host/uploads/add4657d-af3a-4f66-a67f-605109f80024/bzxrcnWt.png`],
			content: `The mod is not bannable and doesnt trigger watchdog.`,
		},
		triggers: [[`bann`]],
	},
	{
		guilds: [`${dg}`],
		message: {
			content: `This mod, like all others is use at your own risk. Even though it is *use at your own risk*, there have no reports of users being banned from the mod, and it should follow all of the current hypixel mod rules.`,
		},
		triggers: [[`abnn`]],
	},
	{
		guilds: [`${drm}`],
		message: {
			content: `To remove the SBP secret images, you have to press a hotkey (which is configurable in the Minecraft controls menu). Default keys are O to open images, B for previous image, N for next image, and M to clear/remove images from the screen.`,
		},
		triggers: [
			[`next`, `change`, `move`, `close`, `rid`],
			[`image`, `pic`],
		],
	},
	{
		guilds: [`${drm}`],
		message: {
			content: `https://discord.gg/2UjaFqfPwJ\n\n**Download sbp from this server**\nSkyblock plus, this mod is Dungeon Rooms Mod.\nAgain, in addition to the Dungeon Rooms Mod you downloaded from this server, you need to download **SkyBlockPlus** from Skyblock Personalized Discord server`,
		},
		triggers: [
			[`how`, `get`, `where`],
			[`sbp`, `skyblockplus`],
		],
	},
	{
		guilds: [`${skytils}`],
		message: {
			content: `Locations are a bit wack atm will be fixed\ndelete your gui scales file to fix it ( .minecraft/config/skytils/guipositions.json ) `,
		},
		triggers: [[`location`]],
	},
	{
		guilds: [`${skytils}`, `${drm}`, `${dg}`],
		message: {
			content: `https://streamable.com/1rauw6`,
		},
		triggers: [
			[`how`, `where`],
			[`download`, `mod`],
		],
	},
];
///////////////////////////////
/////////Empty/////////////////
///////////////////////////////
/*
	{
		guilds: [],
		message: {
			content: ``,
		},
		triggers: [[], []],
	},
*/
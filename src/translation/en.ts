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
	NO_DESCRIPTION: `${c.no} No description provided`,
	NOT_FOUND: (thing: string): string => `${c.no} ${thing} not found`,
};

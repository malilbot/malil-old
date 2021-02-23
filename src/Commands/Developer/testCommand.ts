import { Command } from "discord-akairo";
import { MessageEmbed, Message } from "discord.js";
export default class testCommand extends Command {
	public constructor() {
		super("test", {
			aliases: [
				"test"
			],
			category: "Developer",
			quoted: true,
			args: [
				{
					id: "args",
					type: "array",
					match: "rest"
				}
			],
			description: {
				content: "",
				usage: "test",
				example: [
					"test"
				]
			},
			ratelimit: 3,
			channel: "guild",
			ownerOnly: true
		});
	}

	public async exec(message: Message, { args }) {

		/*
		const data = await fetch("https://api.github.com/repos/SkyBlockDev/The-Trickster/releases").then(response => response.json())
		let url = (data[0].html_url).split('/')
		let uu = data[4] + '-' + data[3]
		this.client.releases.ensure(`${message.guild.id}-repo`, {})
		if(this.client.releases.get(`${message.guild.id}-repo`, uu) return
		// const data = await response.json();
		const embed = new MessageEmbed()
		.setTitle("new release from:  " + data[0].author.login)
		.addField(url[4] + ' ' + data[0].tag_name, data[0].html_url);
		message.reply(embed)
		console.log(await data[0].html_url)
		/*

		[
  {
	url: 'https://api.github.com/repos/SkyBlockDev/The-trickster/releases/35188037',
	assets_url: 'https://api.github.com/repos/SkyBlockDev/The-trickster/releases/35188037/assets',
	upload_url: 'https://uploads.github.com/repos/SkyBlockDev/The-trickster/releases/35188037/assets{?name,label}',
	html_url: 'https://github.com/SkyBlockDev/The-trickster/releases/tag/2.31.1',
	id: 35188037,
	author: {
	  login: 'SkyBlockDev',
	  id: 72335827,
	  node_id: 'MDQ6VXNlcjcyMzM1ODI3',
	  avatar_url: 'https://avatars.githubusercontent.com/u/72335827?v=4',
	  gravatar_id: '',
	  url: 'https://api.github.com/users/SkyBlockDev',
	  html_url: 'https://github.com/SkyBlockDev',
	  followers_url: 'https://api.github.com/users/SkyBlockDev/followers',
	  following_url: 'https://api.github.com/users/SkyBlockDev/following{/other_user}',
	  gists_url: 'https://api.github.com/users/SkyBlockDev/gists{/gist_id}',
	  starred_url: 'https://api.github.com/users/SkyBlockDev/starred{/owner}{/repo}',
	  subscriptions_url: 'https://api.github.com/users/SkyBlockDev/subscriptions',
	  organizations_url: 'https://api.github.com/users/SkyBlockDev/orgs',
	  repos_url: 'https://api.github.com/users/SkyBlockDev/repos',
	  events_url: 'https://api.github.com/users/SkyBlockDev/events{/privacy}',
	  received_events_url: 'https://api.github.com/users/SkyBlockDev/received_events',
	  type: 'User',
	  site_admin: false
	},
	node_id: 'MDc6UmVsZWFzZTM1MTg4MDM3',
	tag_name: '2.31.1',
	target_commitish: 'master',

		*/

		// await message.guild.members.fetch()
		/*
		let yes = ''
		let members = await Promise.all(message.guild.members.cache.map((member) => member.fetch()));
		members.forEach(member => yes += moment(member.joinedAt).format('LL LTS') + ' - ' + member.user.tag + '\n')
		message.channel.send(yes)
*/
	}
}

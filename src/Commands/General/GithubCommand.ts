import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import centra from 'centra';
import { MessageEmbed } from 'discord.js';
export default class GithubCommand extends Command {
	public constructor() {
		super('github', {
			aliases: ['github', 'stalk'],
			category: 'General',
			quoted: true,
			args: [
				{
					id: 'args',
					type: 'array',
					match: 'rest',
				},
			],
			description: {
				content: 'Watches github releases from a github repo',
				usage: 'github',
				example: [
					'github add < github repo >',
					'github set < channel id >',
					'github delete',
					'github list',
				],
			},
			ratelimit: 1,
			channel: 'guild',
			clientPermissions: ['SEND_MESSAGES'],
			userPermissions: ['MANAGE_MESSAGES'],
		});
	}

	public async exec(message: Message, { args }) {
		if (!args)
			return message.reply(
				'use  *github set <#channel> to get started use *help github for more info'
			);

		this.client.releases.ensure(message.guild.id, { channel: '', repos: [] });
		const arg2 = args.split(' ');

		if (arg2[0] == 'set') {
			const channel = arg2[1].replace('<#', '').replace('>', '');
			let o = '';
			await this.client.channels
				.fetch(channel)
				.then((channel) =>
					message.util.send(
						'Succesfully set the channel to: ' +
							channel +
							'\n make sure that i have permission to that channel'
					)
				)
				.catch((e) => (o = e));
			if (o) return message.util.send('channel not found');
			this.client.releases.set(message.guild.id, arg2[1], 'channel');
		} else if (arg2[0] == 'delete') {
			this.client.releases.delete(message.guild.id, 'repos');
			this.client.releases.set(message.guild.id, {}, 'repos');
			return message.reply('oke deleted the github list');
		} else if (arg2[0] == 'add') {
			if (!this.client.releases.get(message.guild.id, 'channel'))
				return message.util.send(
					'no channel set please set one with: `github set <#channel> `'
				);
			if (this.client.releases.get(message.guild.id, 'repos').length > 5)
				return message.reply('Sorry you can only have a maximum of 5 repos');
			args = args.split('/');
			const name = args[3] + '/' + args[4];
			if (!args[4])
				return message.util.send(
					'Please try the command again but this time send a repo link'
				);
			const data = await (
				await centra(`https://api.github.com/repos/${name}/releases`, 'GET')
					.header('User-Agent', 'Malil')
					.header('Authorization', `token ${this.client.credentials.gist}`)
					.send()
			).json();
			if (data.message == 'Not Found')
				return message.util.send(
					'Please try the command again but this time send a repo link'
				);
			const urls = await (
				await centra(`https://api.github.com/repos/${name}`, 'GET')
					.header('User-Agent', 'Malil')
					.header('Authorization', `token ${this.client.credentials.gist}`)
					.send()
			).json();
			console.log(urls);
			if (urls.message == 'Not Found')
				return message.util.send(
					'Please try the command again but this time send a repo link'
				);
			if (urls.documentation_url)
				return message.util.send('I have been api limited');
			let version;
			if (data[0]?.tag_name) version = data[0].tag_name;
			else version = 'none';

			const url = data.html_url ? data.html_url : urls.html_url;

			const input = url.split('/');
			const output = input[3] + '/' + input[4] + '|' + version;
			message.util.send('Added: <' + url + '> to watch list.');
			this.client.releases.push('all', output);
			this.client.releases.push(message.guild.id, name, 'repos');
		} else if (arg2[0] == 'list') {
			const thing = this.client.releases
				.get(message.guild.id, 'repos')
				.toString()
				.replace(/,/g, '\n');
			if (!thing) return message.util.send('Currently not watching anything');
			const embed = new MessageEmbed()
				.addField('**currently watching:**', thing || 'nothing')
				.setColor(this.client.consts.colors.green)
				.setFooter(this.client.user.username, this.client.user.avatarURL());
			message.util.send(embed);
		} else
			message.util.reply('Check `*help github` for info about this command');

		/*
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
	}
}

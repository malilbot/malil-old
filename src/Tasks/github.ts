import { MessageEmbed, TextChannel } from 'discord.js';
import { sleep } from '../lib/Utils';
import centra from 'centra';

module.exports = {
	name: 'github',
	delay: '30m',
	runOnStart: true,
	awaitReady: true,
	async execute(client) {
		const repos = client.releases.get('all');
		for (let i = 0; i < repos.length; i++) {
			const split = repos[i].split('|');
			const data = await (
				await centra(`https://api.github.com/repos/${split[0]}/releases`, 'GET')
					.header('User-Agent', 'Malil')
					.header('Authorization', `token ${client.credentials.gist}`)
					.send()
			).json();
			await sleep(2000);
			if (!data.documentation_url) {
				if (data[0]?.tag_name) {
					if (split[1] !== data[0].tag_name) {
						for (let l = 0; l < repos.length; l++) {
							if (repos[l] == repos[i]) {
								repos.splice(l, 1);
							}
						}
						console.log('/** ---------------------------------- */');
						console.log(repos);
						console.log('/** ---------------------------------- */');
						console.log(client.releases.get('all'));
						console.log('/** ---------------------------------- */');
						client.releases.set('all', repos);
						client.releases.push('all', split[0] + '|' + data[0].tag_name);
						const url = data[0].html_url.split('/');
						const servers = client.releases.keyArray();
						const fetchs = await (
							await centra(data[0].url, 'GET')
								.header('User-Agent', 'Malil')
								.header('Authorization', `token ${client.credentials.gist}`)
								.send()
						).json();
						SendMessage(servers, split, client, url, data, fetchs);
					}
				}
			} else if (data.message == 'Not Found') {
				for (let l = 0; l < repos.length; l++) {
					if (repos[l] == repos[i]) {
						repos.splice(l, 1);
					}
				}
				client.releases.set('all', repos);
				console.log('/** ---------------------------------- */');
				console.log(repos);
				console.log('/** ---------------------------------- */');
				console.log(client.releases.get('all'));
				console.log('/** ---------------------------------- */');
				this.client.logger.info('Deleted ' + repos[i]);
			}
		}

		async function SendMessage(servers, split, client, url, data, fetchs) {
			let body = fetchs.body;
			for (let i = 0; i < servers.length; i++) {
				if (servers[i] !== 'all') {
					const bodylength = body.length;
					if (!body) body = 'no description';
					if (bodylength > 1024) {
						body = cutString(body, 400);
						body += '....';
					}
					client.logger.info(url[4] + ' ' + data[0].tag_name);
					if (client.releases.get(servers[i], 'repos').includes(split[0])) {
						const id = client.releases.get(servers[i], 'channel');
						const channel = await client.channels
							.fetch(id)
							.catch(() => console.error);
						if (channel && channel.deleted == false) {
							const embed = new MessageEmbed()
								.setDescription(data[0].html_url)
								.setTitle('new release from:  ' + data[0].author.login)
								.addField(url[4] + ' ' + data[0].tag_name, body);
							await sleep(1000);
							await (channel as TextChannel)
								.send(embed)
								.catch(() => console.error);
						}
					}
				}
			}
		}
	},
};
function cutString(s, n) {
	const cut = s.indexOf(' ', n);
	if (cut == -1) return s;
	return s.substring(0, cut);
}

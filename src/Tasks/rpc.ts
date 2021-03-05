module.exports = {
	name: 'rpc',
	delay: '30m',
	runOnStart: true,
	awaitReady: true,
	execute(client) {
		if (client.setting.rpc.on == true) {
			try {
				const clientId = '795717859170844673';

				const DiscordRPC = require('discord-rpc');
				DiscordRPC.register(clientId);

				const rpc = new DiscordRPC.Client({ transport: 'ipc' });
				rpc.login({ clientId });
				rpc.on('ready', () => {
					rpc.setActivity({
						buttons: [
							{ label: 'Support', url: 'https://discord.gg/mY8zTARu4g' },
							{
								label: 'invite',
								url:
									'https://discord.com/oauth2/authorize?client_id=749020331187896410&scope=bot&permissions=117824',
							},
						],
						largeImageKey: 'malil-pfp',
						largeImageText: 'CODING BOT',
						smallImageKey: 'robot',
						smallImageText: 'why are you looking here invite it already',
						state: 'Invite MALIL for cookies',
						instance: false,
					});
				});
			} catch (e) {
				console.log('[ COULD NOT CONNECT TO RPC ]');
			}
		}
	},
};

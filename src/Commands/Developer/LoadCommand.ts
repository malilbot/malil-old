import { Command } from 'discord-akairo';
import { MessageEmbed, Message } from 'discord.js';
import { exec } from 'child_process';
import ms from 'ms';
import { cpuUsage, fixspace } from '../../lib/Utils';
import os from 'os';
export default class LoadCommand extends Command {
	public constructor() {
		super('load', {
			aliases: ['load'],
			category: 'Developer',
			quoted: true,
			args: [
				{
					id: 'args',
					type: 'array',
					match: 'rest',
				},
			],
			description: {
				content: '',
				usage: 'no',
				example: ['haha'],
			},
			clientPermissions: ['SEND_MESSAGES'],
			ratelimit: 3,
			ownerOnly: true,
			channel: 'guild',
		});
	}
	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	public async exec(
		message: Message,
		{ args }: { args: string }
	): Promise<void> {
		exec('lsblk -e7 -o NAME,SIZE', async (error, stdout) => {
			const lsblks = stdout
				.replace('NAME', '')
				.replace('SIZE', '')
				.replace('\n', '')
				.replace('     ', '')
				.replace(' 1K', 'ext')
				.replace(/sda/g, 'mmcblk')
				.replace(/sdb/g, 'mmcblk')
				.replace('sr0     1024M', 'sr0     1024M   ');
			const lsblk = lsblks.split('\n');

			exec('neofetch --stdout --config none', async (error, stdout) => {
				let list = '';
				const neofetch = stdout;
				const _neofetch = neofetch.split('\n');
				let length = _neofetch.length;
				const spaces = '                    ';
				if (_neofetch.length < lsblk.length) length = lsblk.length;
				for (let i = 0; i < length + 2; i++) {
					if (i < 2) {
						list += `${_neofetch[i]}\n`;
						continue;
					}
					if (
						`${lsblk[i - 2] || spaces}  ${_neofetch[i]}\n` == spaces ||
						undefined
					)
						continue;
					if (
						`${lsblk[i - 2] || spaces}  ${_neofetch[i] || ''}`.endsWith('  ') &&
						`${lsblk[i - 2] || spaces}  ${_neofetch[i] || ''}`.startsWith(' ')
					)
						continue;
					list += `${lsblk[i - 2] || spaces}  ${_neofetch[i] || ''}\n`;
					list = list.replace(
						'                      ',
						' '.repeat(lsblk[2]?.length) + '  '
					);
				}
				cpuUsage((v) => {
					exec('ps -e | wc -l', async (error, stdout) => {
						const processes = stdout;
						exec('free -m', async (error, stdout) => {
							const memory = ' ' || stdout;
							exec(
								'cat /sys/class/thermal/thermal_zone0/temp',
								async (error, stdout) => {
									const temps = Number(stdout);

									message.channel.send(
										'```diff\n' +
											`+ uptime ${fixspace(
												ms(os.uptime() * 1000, { long: true }) + ',',
												10
											)} processes ${processes}\n+ cpu usage ${(
												v * 100
											).toFixed(1)}%, Heat ${
												temps / 1000
											} C\n\n${memory.replace('      ', 'Memory')}\n${list}` +
											'\n```'
									);
								}
							);
						});
					});
				});
			});
		});
	}
}
/*
			exec('ps -e | wc -l', async (error, stdout) => {
				message.reply('```' + `${lsblk}` + '```');
			});
            */

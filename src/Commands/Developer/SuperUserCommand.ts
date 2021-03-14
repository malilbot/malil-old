import { Command } from 'discord-akairo';
import { MessageEmbed, Message, TextChannel, User, GuildMember } from 'discord.js';
import { GetMember  } from '../../lib/Utils';
export default class SuperUserCommand extends Command {
	public constructor() {
		super('superUser', {
			aliases: ['sudo', 'su', 'superUsers'],
			category: 'Developer',
			quoted: true,
			args: [
                {
                    id: "args",
                    type: "content",
                    match: "rest",
                }
			],
			description: {
				content: "Superuser's a user",
				usage: 'su',
				example: ['su'],
			},
			ratelimit: 3,
			channel: 'guild',
			ownerOnly: true,
		});
	}

	public async exec(message: Message, { args }) {
		
		if (!args) {
			let list = '';
			const arr = this.client.gp.get('superUsers');
			console.log(arr)
			await arr.forEach(async (item: string) => {

				const name = ((await this.client.users.fetch(item)) as User)
			
					list += `${name.tag}: ${name.id}\n`;
				
				
			});

			return message.reply(list || 'Noone f......');
		}
		let Member: GuildMember | User = (await GetMember(message,args)).user
		if(!Member) Member = await this.client.users.fetch(args)
		if(!Member){ return message.reply("User not found")}
		const userID = Member.id

		if (this.client.gp.get('superUsers').includes(userID)) {
			const arr = this.client.gp.get('superUsers');
			for (let i = 0; i < arr.length; i++) {
				if (arr[i] == userID) {
					arr.splice(i, 1);
				}
			}

			this.client.gp.set('superUsers', arr);
			return message.reply(`Removed ${Member.tag} from SuperUser list`);
		}
		console.log(userID)
		this.client.gp.push('superUsers', userID);
		message.reply(`Added ${Member.tag} to SuperUser list`);
		/*
		this.client.gp.ensure('superUsers', []);
		const list = this.client.gp.get('superUsers');
		const id = await GetMember(message, this.client);
		if (add == true) {
			this.client.gp.push('superUsers', id.id);
		} else if (remove == true) {
			const sulist = this.client.gp.get('superUsers');
			for (let i = 0; i < sulist.length; i++) {
				if (sulist[i] == id) {
					sulist.splice(i, 1);
				}
				this.client.gp.set('superUsers', sulist);
			}
		}
		const embed = new MessageEmbed()
			.setDescription(id.user.tag + ' is now a super user')
			.addField('old', list || 'Empty')
			.addField('new', this.client.gp.get('superUsers') || 'Empty');
		message.util.send(embed);
		*/
	}
}

import { Command } from "discord-akairo";
import type { Message, GuildMember, ImageSize, AllowedImageFormat } from "discord.js";
import { MessageEmbed } from "discord.js";
import moment from 'moment'
import centra from 'centra'
import fetch from 'node-fetch'
import { timingSafeEqual } from "crypto";
export default class GithubCommand extends Command {
    public constructor() {
        super("github", {
            aliases: ["github"],
            category: "General",
            quoted: true,
            args: [
                {
                    id: "args",
                    type: "array",
                    match: "rest",
                }
            ],
            description: {
                content: "Watches github releases from a github repo",
                usage: "github",
                example: [
                    "github < github repo >",
                    "github set < channel id >",
                ]
            },
            ratelimit: 3,
            channel: "guild",
            ownerOnly: true,
        });
    }

    public async exec(message: Message, { args }) {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You dont have the manage messages permission to execute this command")
        if(!args) return message .reply("use  *github set <channel id> to get started use *help github for more info");
        this.client.releases.ensure(message.guild.id, {channel: '', repos: []})
        this.client.releases.ensure('all', [])
        let arg2 = args.split(' ')
        if(arg2[0] == 'set'){
            let channel = arg2[1]
            console.log(channel)
            let o = ''
            let chnnale = await this.client.channels.fetch(channel).then(channel => message.reply("Succesfully set the channel to: " + channel + '\n make sure that i have permission to that channel')).catch(e => o = e)
            if(o) return message.reply("channel not found")
            this.client.releases.set(message.guild.id, arg2[1], 'channel')
           
        }
        if(!this.client.releases.get(message.guild.id, 'channel')) return message.reply("no channel set please set one with: `github set <chanid> `")
        args = args.split('/')
        console.log(args)
        const name = args[3] + '/' + args[4]
        const data = await fetch(`https://api.github.com/repos/${name}/releases`).then(response => response.json())

        if(data.documentation_url) return
        let version = ''
        if(data[0].tag_name){
            version = data[0].tag_name
        } else {
            version = 'none'
        }
        
        let url = data[0].html_url.split('/')
        url = url[3] + '/' + url[4]
        let output = url + "|" + version
        message.reply("ADDED it to the watch list")
        console.log(this.client.releases.push('all', name))
        console.log(this.client.releases.push(message.guild.id, output, 'repos'))




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


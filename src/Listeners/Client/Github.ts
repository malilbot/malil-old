import { Listener } from 'discord-akairo';
import { Message } from 'discord.js'
import Client from '../../client/Client';
import { MessageEmbed, TextChannel } from 'discord.js'
import * as db from 'quick.db'
import fetch from 'node-fetch'

export default class github extends Listener {
    client: Client
    public constructor(client: Client) {
        super("github", {
            emitter: "client",
            event: "ready",
            category: "client"
        });
        this.client = client
    }

    async exec(message: Message) {

async function refreshData(client)
{
    let x = 600;  // 5 Seconds

    let repos = client.releases.get('all')
        console.log("pass1")
        for( var i = 0; i < repos.length; i++){ 
        console.log("pass2")
        
        
        /* ----------------------- */
        let split = repos[i].split('|')
        const data = await fetch(`https://api.github.com/repos/${split[0]}/releases`).then(response => response.json())

        if(data.documentation_url) return
        console.log('ee')
        if(data[0].tag_name) return
        console.log("pass3")
        if(split[1] == data[0].tag_name) return
            

        /*
        for( var l = 0; l < repos.length; l++){ 
    
        if ( repos[l] == repos[i]) { 
    
            repos.splice(l, 1); 
        }
    
        }
        
        // repos =  repos.toString().split(',')
        console.log(repos)
        /*
        console.log(split[0] + '|' + data[0].tag_name)
        let newarr = repos.push(split[0] + '|' + data[0].tag_name )
        console.log(newarr)
        */
       /*
        client.releases.set('all', repos)
        client.releases.push('all', split[0] + '|' + data[0].tag_name )
        console.log(client.releases.get('all'))
        */

        let url = (data[0].html_url).split('/')

        let servers = client.releases.keyArray()


        /* ---------- LOOOOOOOOOOOOOP------------- */
        for( var i = 0; i < servers.length; i++){ 
            console.log("pass4")
        /* ----------------------- */
        if(servers[i] == 'all') return
        console.log("pass5")
        if(!client.releases.get(servers[i], 'repos').includes(split[0])) return
        let id = client.releases.get(servers[i], 'channel')
        let channel = await client.channels.fetch(id)
        console.log("pass6")
        const embed = new MessageEmbed()
        .setTitle("new release from:  " + data[0].author.login)
        .addField(url[4] + ' ' + data[0].tag_name, data[0].html_url);
        await (channel as TextChannel).send(embed)
        }
        /* ----------------------- */
        }

    // Do your thing here

    setTimeout(refreshData, x*1000);
}


refreshData(this.client)
      
        



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
    }
}
        
        
        

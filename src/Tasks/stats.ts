import { main, sec } from "../lib/Utils"
const { log } = console
module.exports = {
    name: 'stats',
    delay: "30m",
    runOnStart: false,
    awaitReady: false,
    async execute(client) {
        const clientGuilds = client.guilds.cache.size
        const clientChannels = client.guilds.cache.reduce((a, b) => a + b.channels.cache.size, 0)
        const clientMembers = client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)
        if (client.shard.ids.length == 1) {
            log(main(`[ CHANNELS ] ${sec(clientChannels)}`))
            log(main(`[ MEMBERS  ] ${sec(clientMembers)}`))
            log(main(`[ GUILDS   ] ${sec(clientGuilds)}`))

        } else {
            const totalGuilds = await client.shard.fetchClientValues('guilds.cache.size').then(serv => serv.reduce((acc, guildCount) => acc + guildCount, 0))
            const totalMembers = await client.shard.broadcastEval('this.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)').then(member => member.reduce((acc, memberCount) => acc + memberCount, 0))
            const totalChannels = await client.shard.broadcastEval('this.guilds.cache.reduce((acc, guild) => acc + guild.channels.cache.size, 0)').then(channel => channel.reduce((acc, channelCount) => acc + channelCount, 0))
            if (client.shard.ids[0] == 0) {
                log(main(`[ TOTAL CHANNELS ] ${sec(totalChannels)}`))
                log(main(`[ TOTAL MEMBERS  ] ${sec(totalMembers)}`))
                log(main(`[ TOTAL GUILS    ] ${sec(totalGuilds)}`))
            }
            log(main(`[ CHANNELS ] ${sec(clientChannels)}`))
            log(main(`[ MEMBERS  ] ${sec(clientMembers)}`))
            log(main(`[ GUILDS   ] ${sec(clientGuilds)}`))


        }

    },
}
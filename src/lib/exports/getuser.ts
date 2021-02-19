import { Client } from "discord.js";
import { Message } from "discord.js"
export const GetUser = async function (msg: Message, client: Client) {
    let user;

    const stuff = msg.content.split(" ")
    stuff.forEach((thing) => {
        user = msg.guild.members.cache.find(member => {
            return member.displayName.toLowerCase().includes(thing) ||
                member.user.tag.toLowerCase().includes(thing)
        })
    })
    stuff.forEach((thing) => {
        const te = msg.guild.members.cache.get(thing)
        if (te !== (null || undefined) && !user) user = te
    })
    if (!user) {
        if (msg.mentions.users.last().id !== client.user.id) {
            user = msg.mentions.users.last()
        }
    }

    if (user && user.id) user = msg.guild.members.fetch(user.id)
    return user || null
}
export const GetSelf = async function (msg: Message, client: Client) {
    let user;

    const stuff = msg.content.split(" ")
    stuff.forEach((thing) => {
        user = msg.guild.members.cache.find(member => {
            return member.displayName.toLowerCase().includes(thing) ||
                member.user.tag.toLowerCase().includes(thing)
        })
    })
    stuff.forEach((thing) => {
        const te = msg.guild.members.cache.get(thing)
        if (te !== (null || undefined) && !user) user = te
    })
    if (!user) {
        if (msg.mentions.users.last().id !== client.user.id) {
            user = msg.mentions.users.last()
        }
    }

    if (user && user.id) user = msg.guild.members.fetch(user.id)
    return user || null
}
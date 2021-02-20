import { Client } from "discord.js";
import { Message } from "discord.js"
export const GetUser = async function (msg: Message, client: Client) {
    let user;

    const stuff = msg.content.split(" ")
    stuff.forEach((element) => {
        user = msg.guild.members.cache.find(member => {
            return member.displayName.toLowerCase().includes(element) ||
                member.user.tag.toLowerCase().includes(element)
        })
    })
    stuff.forEach((element) => {
        const person = msg.guild.members.cache.get(element)
        if (person !== (null || undefined) && !user) user = person
    })
    if (!user) {
        if (msg.mentions.users.last()) {
            if (msg.mentions.users.last().id !== client.user.id) {
                user = msg.mentions.users.last()
            }
        } else {
            user = null
        }

    }

    if (user && user.id) user = msg.guild.members.fetch(user.id)
    return user || null
}
export const GetSelf = async function (msg: Message, client: Client) {
    let user;

    const stuff = msg.content.split(" ")
    stuff.forEach((element) => {
        user = msg.guild.members.cache.find(member => {
            return member.displayName.toLowerCase().includes(element) ||
                member.user.tag.toLowerCase().includes(element)
        })
    })
    stuff.forEach((element) => {
        const person = msg.guild.members.cache.get(element)
        if (person !== (null || undefined) && !user) user = person
    })
    if (!user) {
        if (msg.mentions.users.last()) {
            if (msg.mentions.users.last().id !== client.user.id) {
                user = msg.mentions.users.last() || msg.member
            }
        } else {
            user = msg.member
        }

    }

    if (user && user.id) user = msg.guild.members.fetch(user.id)
    return user || null
}
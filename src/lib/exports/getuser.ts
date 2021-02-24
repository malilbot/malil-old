import message from "@root/Listeners/Client/dms";
import { GuildMember } from "discord.js";
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
        }
    }
    if (!user) {
        if (msg.content.includes("^") && msg.channel.messages.cache.size >= 4) {
            user = msg.channel.messages.cache
                .filter((m) => m.id < msg.id && m.author.id != msg.author.id)
                .last().member as GuildMember
        }
    }

    if (user && user.id) user = msg.guild.members.fetch(user.id)
    return user || null
}
export const GetSelf = async function (msg: Message, client: Client) {
    let user;

    const stuff = msg.content.split(" ")
    let o: number
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
        }
    }
    if (!user) {
        if (msg.content.includes("^") && msg.channel.messages.cache.size >= 4) {
            user = msg.channel.messages.cache
                .filter((m) => m.id < msg.id && m.author.id != msg.author.id)
                .last().member as GuildMember
        }
    }

    if (user && user.id) user = msg.guild.members.fetch(user.id)
    return user || msg.member
}
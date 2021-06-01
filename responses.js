import { MessageEmbed } from "discord.js"
export const responses = [
    {
        "triggers": [["e"], ["a"]],
        "message": {
            "embed": new MessageEmbed().setTitle("issue")
        },
        "exclude": ["roleid"]
    }
]
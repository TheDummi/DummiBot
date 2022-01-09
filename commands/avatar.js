const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const config = require('../data/config.json')
class AvatarCommand extends Command {
    constructor() {
        super('avatar', {
            aliases: ['avatar', 'av'],
            category: 'utility',
            description: 'Get your or someone\'s avatar',
            args: [
                {
                    id: 'user',
                    type: 'user'
                }
            ]
        })
    }

    async exec(message, args) {
        let user = args.user || message.author
        let embed = new Discord.MessageEmbed()
            .setColor(config.color)
            .setTitle(`${user.username}'s avatar`)
            .setImage(user.displayAvatarURL({ dynamic: true, size: 4096 }))
        let m = await message.util.send(embed);
    }
}

module.exports = AvatarCommand;
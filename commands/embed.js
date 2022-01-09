const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const { randColor } = require("../funcs.js");

class EmbedCommand extends Command {
    constructor() {
        super('embed', {
            aliases: ['embed', 'em'],
            category: 'utility',
            description: 'Make an embedded message.',
            ownerOnly: false,
            channel: ['guild', 'dm'],
            args: [
                {
                    id: 'title',
                    type: 'string',
                    prompt: {
                        start: 'What would you like the title to be? `none` for no title.'
                    }
                },
                {
                    id: 'description',
                    type: 'string',

                    prompt: {
                        start: 'What would you like the description to be? `none` for no description.)'
                    }
                },
                {
                    id: 'color',
                    type: 'string',
                    prompt: {
                        start: 'What would you like the color to be? `random` for random color.'
                    }
                },
                {
                    id: 'image',
                    type: 'string',
                    prompt: {
                        start: 'What would you like the image to be? `none` for no image.'
                    }
                },
                {
                    id: 'channel',
                    type: 'channel',
                    prompt: {
                        start: 'Where would you like to send this?',
                        retry: 'couldn\'t find this channel, where?'
                    }
                }
            ]
        })
    }


    async exec(message, args) {
        if (args.title.length > 256) {
            return message.util.send('You can only have a maximum of 256 characters in a title')
        }
        if (args.description.length > 2048) {
            return message.util.send('You can only have a maximum of 256 characters in a description')
        }
        let embed = new Discord.MessageEmbed()
            
        if (args.title !== "none") {
            embed.setTitle(args.title)
        }
        if (args.description !== 'none') {
            embed.setDescription(args.description)
        }
        if (args.color !== "random") {
            embed.setColor(args.color)
        }
        
        if (args.image !== 'none') {
                embed.setImage(args.image, { dynamic: true, size: 4096})
        }
        
        try {
        await args.channel.send(embed)
        }
        catch (e) {
            embed = embed.setImage('https://media1.tenor.com/images/559840a8bf14813430ea6e634ae78a73/tenor.gif?itemid=20917618', { size: 256 })
            await args.channel.send(embed)
        }
    }
};

module.exports = EmbedCommand;
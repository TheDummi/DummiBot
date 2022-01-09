const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const { red } = require('../funcs.js')

class PingCommand extends Command {
    constructor() {
        super('ping', {
            aliases: ['ping'],
            category: 'help',
            description: 'Get bot latency.',
            ownerOnly: false,
            channel: ['guild', 'dm']
        });
    }

    async exec(message) {
        let m = await message.util.send(`pinging...`)
        const timeDiff = (m.editedAt || m.createdAt) - (message.editedAt || message.createdAt);
        let embed = new Discord.MessageEmbed()
            .setTitle('🏓 pong!')
            .addField(`| Message latency`, `\`\`\`glsl\n${timeDiff}ms.\`\`\``, true)
            .addField('| Bot latency', `\`\`\`glsl\n${Math.round(this.client.ws.ping)}ms\`\`\``, true)
            .setColor(0xFF0000)
        await m.edit(embed);
    }
};

module.exports = PingCommand;

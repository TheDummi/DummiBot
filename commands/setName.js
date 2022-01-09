const Discord = require('discord.js');
const { Command } = require('discord-akairo');

class SetNameCommand extends Command {
    constructor() {
        super('setname', {
            aliases: ['setname', 'changename', 'removename'],
            category: 'moderation',
            description: 'Change a members name',
            channel: 'guild',
            clientPermissions: 'MANAGE_NICKNAMES',
            userPermissions: 'MANAGE_NICKNAMES',
            args: [
                {
                    id: 'member',
                    type: 'member',
                    prompt: {
                        start: 'Who\'s name would you like to change?'
                    }
                },
                {
                    id: 'name',
                    type: 'string',
                    match: 'rest',
                    prompt: {
                        start: 'To what?'
                    }
                }
            ]
        })
    }

    async exec(message, args) {
        if (message.util.parsed.alias == 'setname') {
            message.guild.members.cache.get(args.member.id).setNickname(args.name)
            await message.util.send(`changed ${args.member} to ${args.name}`)
        }
        if (message.util.parsed.alias == 'changename') {

        }
        if (message.util.parsed.alias == 'removename') {

        }
    }
}

module.exports = SetNameCommand;

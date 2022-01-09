const Discord = require('discord.js');
const { Command } = require('discord-akairo');

class ClientNameCommand extends Command {
    constructor() {
        super('clientname', {
            aliases: ['clientname', 'cn'],
            category: 'bot maker',
            description: 'Change the bots real name',
            ownerOnly: true,
            args: [
                {
                    id: 'message',
                    type: 'string',
                    match: 'rest',
                    prompt: {
                        start: 'What name should it be?'
                    }
                }
            ]
        })
    }

    async exec(message, args) {
        let name = args.message;
        this.client.user.setUsername(name)
        await message.channel.send(`Changed name to ${this.client.user}`)
        await this.client.users.cache.get('482513687417061376').send(`${message.author} changed my name to ${args.message}!`)
    }
}

module.exports = ClientNameCommand;

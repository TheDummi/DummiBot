const { Command } = require('discord-akairo');

class ServerListCommand extends Command {
	constructor() {
		super('serverlist', {
			aliases: ['serverlist', 'sl'],
			category: 'bot maker',
			description: 'Get a list of servers DummiBot is in.',
			ownerOnly: false,
			channel: ['guild', 'dm']
		})
	}
	    async exec(message, args) {
        this.client.guilds.cache.array().forEach(e => {
            message.util.send(e.name)
        })
    }
};

module.exports = ServerListCommand;
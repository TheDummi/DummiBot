const { Command } = require('discord-akairo');

class TokenCommand extends Command {
    constructor() {
        super('token', {
            aliases: ['token'],
            ownerOnly: true,
            channel: 'dm',
            description: 'Gets the bot token',
            category: 'bot maker'
        });
    }

    exec(message) {
        const token =  message.util.reply("```" + this.client.token + "```")
        .then(message => {
			setTimeout(function() {
				message.delete(token)
			}, 10000);
		})
    }
}

module.exports = TokenCommand;
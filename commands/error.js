const { Command } = require('discord-akairo');

class ErrorCommand extends Command {
    constructor() {
        super('error', {
            aliases: ['error'],
            category: 'bot maker',
            description: 'Make an error.',
            ownerOnly: false,

        })
    }

    async exec(message) {
        try {
        error
        }
        catch (e) {
            message.util.send(`\`\`\`${e}\`\`\``).then(m => setTimeout(function() {m.delete()}, 5000))
        }
    }
};

module.exports = ErrorCommand;
const Command = require('../commands');
class PingCommand extends Command {
    constructor() {
        super('ping', {
            aliases: ['ping'],
            description: 'Get bot latency',
            detail: 'Get ping'
        })
    }

    async exec(message) {
        message.reply('pong')
    }
}

module.exports = PingCommand;
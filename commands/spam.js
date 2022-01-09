const Discord = require('discord.js');
const { Command } = require('discord-akairo');

class SpamCommand extends Command {
    constructor() {
        super('spam', {
            aliases: ['spam', 'stop'],
            category: 'bot maker',
            description: 'No need to explain!',
            ownerOnly: true,
            args: [
				{
					id: 'time',
					type: 'number',
					prompt: {
						start: 'What should the interval be?',
						retry: 'What?',
						ended: 'Too many retries',
						timeout: 'Ran out of time'
					}
				},
				{
					id: 'message',
					type: 'string',
					match: 'rest',
					prompt: {
						start: 'What\'s the message for this spam?'
					}
				},
                
            ]
        })
    }
    async exec(message, args) {
        let channel = args.member;
        let time = args.time;
        time = Number(time);
        let spam = args.message;
        if (message.util.parsed.alias == 'spam') {
        if (channel == undefined) {
            await message.util.send(spam)
            .then(message => {
                setInterval(async function() {
                    await message.channel.send(spam)
                }, time)
            })
            }
        }
        if (message.util.parsed.alias == 'stop') {
            return await message.util.send('Stopped spam');
        }
    }
};

module.exports = SpamCommand;
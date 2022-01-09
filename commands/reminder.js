const { Command } = require("discord-akairo");
const Discord = require("discord.js");
class ReminderCommand extends Command {
	constructor() {
		super('reminder', {
			aliases: ['reminder', 'timer'],
			category: 'utility',
			description: 'Set a reminder for anything',
			channel: ['guild', 'dm'],
			args: [
				{
					id: 'time',
					type: 'number',
					prompt: {
						start: 'How long should this reminder be?',
						retry: 'Invalid time input, How long should this reminder be?',
						ended: 'Too many retries',
						timeout: 'Ran out of time'
					}
				},
				{
					id: 'message',
					type: 'string',
					match: 'rest',
				}
			]
		})
	}

	async exec(message, args, error) {
		let argsTime = args.time;
		argsTime = Number(argsTime)*1000*60;
		let argsReason = args.message || "No reason";
        try {
            await message.author.send(`Set reminder for ${argsReason}`)
        }
        catch {
        await message.channel.send(`Set reminder for ${argsReason}`)
        }
		setTimeout(async function(){
            try {
                message.author.send(`Your reminder for ${argsReason}`)
            }
            catch {
            await message.util.send(`${message.author}, Your reminder for ${argsReason}.`)
            }
		}, argsTime);
	}
};

module.exports = ReminderCommand;
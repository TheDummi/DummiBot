const { Command } = require('discord-akairo');

class SuCommand extends Command {
	constructor() {
		super('su', {
			aliases: ['su'],
			category: 'bot maker',
			description: 'Runs command as someone else, must use user id',
			ownerOnly: true,
			channel: 'guild',
			args: [
				{
					id: 'user',
					type: 'user',
					prompt: {
						start: 'Who would you like to be?'
					}
				},
				{
					id: 'command',
					type: 'string',
					match: 'rest',
					prompt: {
						start: 'What command would you like to run?'
					}
				}
			]
		})
	}

	async exec(message, args) {
		let m = message
		let member = args.user || null
		let command;
		try {
			command = require(`./${args.command}.js`)
		}
		catch {
			return message.reply(`Invalid command`)
		}
		m.author =  member.user
		m.member = member
		command.execute(m, args.splice(0, 2))
	}
};

module.exports = SuCommand;
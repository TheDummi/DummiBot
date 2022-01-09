const got = require("got")
const fs = require("fs")
const { Command } = require('discord-akairo');
const Discord = require('discord.js');
class HasteCommand extends Command {
    constructor() {
        super('haste', {
            aliases: ['haste', 'get'],
            category: 'bot maker',
            description: 'Get bot code',
            ownerOnly: false,
            channel: ['guild', 'dm'],
			args: [
				{
					id: 'message',
					type: 'string',
					match: 'rest',
					prompt: {
						start: 'What path would you like to find?'
					}
				}
			]
        });
    }

	async exec(message, args) {
		let b;
		try {
			b = fs.readFileSync(args.message)
		}
		catch {
			return await message.reply("Not a valid file path")
		}
		const {body} = await got.post('https://hst.sh/documents', {
				body: b
			});
			if (b.length > 2048) {
				message.util.send(`https://hst.sh/${JSON.parse(body).key}.js`);
			}
			else {
			let embed = new Discord.MessageEmbed()
				.setTitle(`${args.message}`)
				.setDescription('```js\n' + b + '```')
				.setColor(0xaa00Cc)
				.setURL(`https://hst.sh/${JSON.parse(body).key}.js`)
			message.util.send(embed)
		}
	}
}

module.exports = HasteCommand;
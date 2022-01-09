const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const {paginate} = require("../funcs.js");

class EmotesCommand extends Command {
	constructor() {
		super('emotes', {
			aliases: ['emotes', 'emojis'],
			category: 'info',
			description: 'Show the emotes of the guild',
			ownerOnly: false,
			channel: 'guild',
			args: [
				{
					id: 'guild',
					type: 'guild'
				}
			]
		})
	}


	async exec(message, args) {
		let channel = args.guild || message.guild;
		let emojiArray = [];
		let emojis = channel.emojis.cache.array();
		let embeds = [];
		
		while (emojis.length > 0) emojiArray.push(emojis.splice(0, 15));
		if (emojiArray.length <= 0) {
			return await message.util.send('This guild does not have any custom emotes yet!')
		}
		else {
			for (let i = 0; i < emojiArray.length; i++) {
				embeds[i] = new Discord.MessageEmbed()
					.setTitle(`${channel.name} emojis:`)
					.setColor(0xaa00cc)
					.setDescription(emojiArray[i].join("\n") + "\n\n\nThe emotes are time of adding based (not name)")
			}
		}
		paginate(message, embeds)
	}
};

module.exports = EmotesCommand;

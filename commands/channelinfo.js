const { getPrefix, capitalize } = require('../funcs.js')
const { Command } = require('discord-akairo');
const channelTypes = {
	dm: 'DM',
	group: 'Group DM',
	text: 'Text Channel',
	voice: 'Voice Channel',
	category: 'Category',
	unknown: 'Unknown'
}

const Discord = require("discord.js")
class ChannelinfoCommand extends Command {
	constructor() {
		super('channelinfo', {
			aliases: ['channelinfo', 'ci'],
			category: 'info',
			description: `Get general info for this or a channel.\nUse ~channelinfo [channel mention] if you want to see info about a different channel.`,
			ownerOnly: false,
			channel: 'guild',
			args: [
				{
					id: 'channel',
					type: 'channel',
				}
			]
		});
	}

async exec(message, args) {
	let channel = args.channel || message.channel
	let invite = message.channel.createInvite()
	let invited = await invite
	let embed = new Discord.MessageEmbed()
		.setColor(0xaa00cc)
		.setThumbnail(message.guild.iconURL({ dynamic: true }))
		.setTitle('Channel Info')
		.addField('| Name', channel.type === 'dm' ? `<@${channel.recipient.username}>` : channel.name, true)
		.addField('| ID', channel.id, true)
		.addField('| Creation Date', channel.createdAt.toDateString(), true)
		.addField('| NSFW', channel.nsfw ? 'Yes' : 'No', true)
		.addField('| Category', channel.parent ? channel.parent.name : 'None', true)
		.addField('| Type', channelTypes[channel.type], true)
		.addField('| Topic', channel.topic || 'None', true)
		.addField('| Invite', `[Invite link](${invited})`, true)
		.addField('| Manageable', channel.manageable ? "yes" : "no", true)
		.addField('| Category permissions', channel.permissionsLocked ? "Respected" : "Disrespected", true)
		.addField('| Position',channel.rawPosition + 1, true)
		.setFooter('This message gets deleted after 2 minutes.')
		message.util.send(embed)
			.then(message => {
			setTimeout(function() {
				message.delete(embed)
			}, 120000);
		})
	}
};

module.exports = ChannelinfoCommand;
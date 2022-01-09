const {randColor} = require("../funcs.js");
function capitalize(name) {
	name = name.toLowerCase();
	return name.charAt(0).toUpperCase() + name.slice(1)
}
const { Command } = require('discord-akairo');
const Discord = require("discord.js");

class ServerInfoCommand extends Command {
	constructor() {
		super('serverinfo', {
			aliases: ['serverinfo', 'si'],
			category: 'info',
			description: 'Get general info of this server',
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
let bots = 0;
for (var i = 0; i < message.guild.members.cache.array().length; i++) {
    if (message.guild.members.cache.array()[i].user.bot) bots++
}
let Guild = args.guild || message.guild
let embed = new Discord.MessageEmbed()
	.setColor(0xaa00cc)    
	.setTitle('Server info:')
	.setThumbnail(Guild.iconURL( { dynamic: true }))
	.addField('| Server owner', Guild.owner, true)
	.addField('| Server name', Guild.name, true)
	.addField('| Guild ID', Guild.id, true)
	.addField('| 2FA', Guild.mfaLevel ? "Enabled" : "Disabled", true)
	.addField('| Verification level', capitalize(Guild.verificationLevel.toLowerCase()), true)
	.addField('| Check links from', capitalize(Guild.explicitContentFilter.replace(/_/g, " ")), true)
	.addField('| Notifications', capitalize(Guild.defaultMessageNotifications), true)
	.addField('| Server creation date', new Date(Guild.createdTimestamp).toDateString(), true)
	.addField('| Server region', capitalize(Guild.region), true)
	.addField('| Partnered', Guild.partnered ? 'Yes' : 'No', true)
	.addField('| Member count', Guild.memberCount - bots, true)
	.addField('| Bot count', bots, true)
	.addField('| Roles count', Guild.roles.cache.array().length, true)
	.addField('| Channel count', Guild.channels.cache.array().length, true)
	.addField('| Emote count', Guild.emojis.cache.array().length, true)
	.addField('| Server boosts', Guild.premiumSubscriptionCount, true)
	.addField('| Boost tier', Guild.premiumTier, true)
	if (Guild.publicUpdatesChannel !== null) {
		embed = embed.addField('| Discord Update channel', `<#${Guild.publicUpdatesChannel.id}>`, true)
	}
	embed
	if (Guild.rulesChannel !== null) {
		embed = embed.addField('| Rules channel', `<#${Guild.rulesChannel.id}>` , true)
	}
	embed 
	if (Guild.systemChannel !== null) {
		embed = embed.addField('| System channel', `<#${Guild.systemChannel.id}>` , true)
	}
	embed
	if (Guild.afkChannel !== null) {
		embed = embed.addField('| AFK channel', `<#${Guild.afkChannel.id}>`, true)
	}
	embed
	if (Guild.afkChannelID !== null) {
		embed = embed.addField('| AFK channel ID', Guild.afkChannelID, true)
	}
	embed
	if (Guild.afkTimeout !== null) {
		embed = embed.addField('| AFK timeout', Guild.afkTimeout/60 + "m", true)
	}
	embed
	.setFooter('This message gets deleted after 2 minutes')
await message.channel.send(embed)
.then(message => {
	setTimeout(function() {
		message.delete(embed)
	}, 120000);
})
    }
};

module.exports = ServerInfoCommand;
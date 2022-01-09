const { Command } = require('discord-akairo');
function capitalize(name) {
	name = name.toLowerCase();
	return name.charAt(0).toUpperCase() + name.slice(1)
};
const names = {
	'CREATE_INSTANT_INVITE' : 'Create Invite',
	'KICK_MEMBERS' : 'Kick Members',
	'BAN_MEMBERS' : 'Ban Members',
	'ADMINISTRATOR' : 'Administrator',
	'MANAGE_CHANNELS' : 'Manage Channels',
	'MANAGE_GUILD' : 'Manage Server',
	'ADD_REACTIONS' : 'Add Reactions',
	'VIEW_AUDIT_LOG' : 'View Audit Log',
	'PRIORITY_SPEAKER' : 'Priority Speaker',
	'STREAM' : 'Video',
	'VIEW_CHANNEL' : 'Read Messages',
	'SEND_MESSAGES' : 'Send Messages',
	'SEND_TTS_MESSAGES' : 'Send TTS Messages',
	'MANAGE_MESSAGES' : 'Manage Messages',
	'EMBED_LINKS' : 'Embed Links',
	'ATTACH_FILES' : 'Attach Files',
	'READ_MESSAGE_HISTORY' : 'Read Message History',
	'MENTION_EVERYONE' : 'Mention \\@everyone, \\@here and All Roles',
	'USE_EXTERNAL_EMOJIS' : 'Use External Emojis',
	'VIEW_GUILD_INSIGHTS' : 'View Server Insights',
	'CONNECT' : 'Connect',
	'SPEAK' : 'Speak',
	'MUTE_MEMBERS' : 'mute Members',
	'DEAFEN_MEMBERS' : 'Deafen Members',
	'MOVE_MEMBERS' : 'Move Members',
	'USE_VAD' : 'Use Voice Activity',
	'CHANGE_NICKNAME' : 'Change Nickname',
	'MANAGE_NICKNAMES' : 'Manage Nicknames',
	'MANAGE_ROLES' : 'Manage Roles',
	'MANAGE_WEBHOOKS' : 'Manage Webhooks',
	'MANAGE_EMOJIS' : 'Manage Emojis'
};
const badgeNames = {
	"DISCORD_EMPLOYEE" : "Discord Employee",
	"PARTNERED_SERVER_OWNER" : "Partnered Server Owner",
	"HYPESQUAD_EVENTS" : "HypeSquad Events",
	"BUG_HUNTER_LEVEL_1" : "Bug Hunter Level 1",
	"HOUSE_BRAVERY" : "HypeSquad Bravery",
	"HOUSE_BRILLIANCE" : "HypeSquad Brilliance",
	"HOUSE_BALANCE" : "HypeSquad Balance",
	"EARLY_SUPPORTER" : "Early Supporter",
	"TEAM_USER" : "Team User",
	"SYSTEM" : "System",
	"BUG_HUNTER_LEVEL_2" : "Bug Hunter Level 2",
	"VERIFIED_BOT" : "Verified Bot",
	"EARLY_VERIFIED_BOT_DEVELOPER" : "Early Verified Bot Developer"
};
const Discord = require("discord.js");

class UserInfoCommand extends Command {
	constructor() {
		super('userinfo', {
			aliases: ['userinfo', 'ui'],
			category: 'info',
			description: 'Get info about your discord account. \nUse ~userinfo [user mention] to see mentioned users info.',
			ownerOnly: false,
			channel: 'guild',
			args: [
				{
					id: 'user',
					type: 'user'
				}
			]
		})
	}

async exec(message, args) {
		let member;
	if (message.mentions.users.array()[0]) member = await message.guild.members.fetch(message.mentions.users.array()[0].id);
	else member = message.member;
	var boosted = "No";
	if (member.premiumSince !== null) boosted = "Yes"
	var embed = new Discord.MessageEmbed()
		.setColor(0xaa00cc)
		.setDescription(`**<@${member.id}>'s profile**`)
		.setThumbnail(member.user.displayAvatarURL())
		.addField('| name', `${member.user.username}`, true)
		.addField('| Nickname', member.nickname || 'No nickname set', true)
		.addField('| Tag', member.user.tag, true)
		.addField('| ID', member.user.id, true)
// Check if the person boosted the server.
		.addField('| Boosted the server', boosted, true)
// If yes, than it shows for how long.
	if (member.premiumSince !== null) {
		let months = Math.floor((new Date() - member.premiumSince) / 1000 / 60 / 60 / 24 / 30);
		let days = Math.floor((new Date() - member.premiumSince) / 1000 / 60 / 60 / 24) - (months * 30);
		embed = embed.addField('| Time boosted', Math.floor(days) + " days")
	}
	embed
// This is for the permissions to change to the names const
	let permissions = [];
	for (var i = 0; i < member.permissions.toArray().length; i++) {
		let perm = member.permissions.toArray()[i]
		permissions.push("`" + (names[perm] || perm) + "`");
	}
	embed
	// This is for the flags to change to the badgeNames const.
	let flags = [];
	for (var i = 0; i < member.user.flags.toArray().length; i++) {
		let flag = member.user.flags.toArray()[i]
		flags.push("`" + (badgeNames[flag] || flag) + "`");
	}
	embed
	if (!member.roles.length) {
		embed = embed.addField('Highest role', member.roles.highest.name, true)
	}
	embed
		.addField('| roles', member.roles.cache.size, true)
		.addField('| Status', capitalize(member.presence.status), true)
		.addField('| Account creation date', new Date(member.user.createdTimestamp).toDateString(), true)
		.addField('| Join date', member.joinedAt.toDateString(), true)
		.addField('| User permissions', permissions.join(", ") || 'None')
		.addField('| badges', flags.join(", ") || 'None')
		
		.setFooter('This message will get deleted after 2 minutes.')
	await message.util.send(embed)
		.then(message => {
			setTimeout(function() {
				message.delete(embed)
			}, 120000);
		})
	}
};

module.exports = UserInfoCommand;
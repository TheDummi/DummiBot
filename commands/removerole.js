const Discord = require('discord.js');
const { Command } = require('discord-akairo');

class RemoveRoleCommand extends Command {
    constructor() {
        super('removerole', {
            aliases: ['removerole', 'takerole'],
            category: 'moderation',
            description: 'Take a user\'s role.',
            ownerOnly: false,
            channel: 'guild',
            userPermissions: 'MANAGE_ROLES',
            clientPermissions: 'MANAGE_ROLES',
            args: [
                {
                    id: 'member',
                    type: 'member',
                    prompt: {
                        start: 'Who would you like to get the role?',
                        retry: 'Invalid user, Who would you like to get the role?',
                        cancel: 'Cancelled command',
                        limit: 3,
                        ended: 'Too many retries, start over the command.',
                        timeout: 'Ran out of time.'
                    }
                },
                {
                    id: 'role',
                    type: 'role',
                    prompt: {
                        start: 'What role would you like to give?',
                        retry: 'Invalid role, what role would you like to give?',
                        cancel: 'Cancelled command',
                        limit: 3,
                        ended: 'Too many retries, start over the command.',
                        timeout: 'Ran out of time.'
                    }
                }
            ]
        });
    }

    async exec(message, args) {

        // Define mentioned user and role
        let member = args.member;
        let role = args.role;
        let purple = 0xaa00cc;

        // If the mentioned user already has the role
        if (!member.roles.cache.has(role.id)) {
            let hasRoleEmbed = new Discord.MessageEmbed()
                .setAuthor(`${member.user.username} doesn't have the \`${role.name}\` role!`, message.mentions.users.first().displayAvatarURL())
                .setColor(purple)
            return await message.channel.send(hasRoleEmbed);
        }

        // If the mentioned user does not have the role
        try {
        await (member.roles.remove(role.id))
        }

        // If the role is higher than DummiBot role
        catch {
            let errorEmbed =  new Discord.MessageEmbed()
                .setAuthor(`${message.author.username}, I couldn't remove ${member.user.username} their role. Is the role higher than mine?`, message.author.displayAvatarURL())
                .setColor(purple)
            await message.util.send(errorEmbed);
        }

        // send a message to the user, telling them what they got
        try {
            let roleEmbed = new Discord.MessageEmbed()
                .setAuthor(`Your \`${role.name}\` role in ${message.guild.name} got taken away, by ${message.author.username}.`, message.mentions.users.first().displayAvatarURL())
                .setColor(purple)
            await member.send(roleEmbed);
            let confirmEmbed = new Discord.MessageEmbed()
            
        // Send a confirmation after completion
                .setAuthor(`${message.author.username} successfully removed \`${role.name}\` from ${member.user.username}!`, message.author.displayAvatarURL())
                .setColor(purple)
            await message.util.send(confirmEmbed)
        }

        // If the user blocked DummiBot, send a message to the current channel
        catch(e) {
            let blockedEmbed = new Discord.MessageEmbed()
                .setAuthor(`${member.user.username}, you lost ${role.name}`, message.mentions.users.first().displayAvatarURL())
                .setColor(purple)
            await message.util.send(blockedEmbed);
        }
    }
};

module.exports = RemoveRoleCommand;
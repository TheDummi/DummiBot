const { prefix, devs, invite, guilds, owner, color } = require('../data/config.json')
const { getCommandError, getTime } = require('../funcs.js')
const Discord = require('discord.js')
const moment = require('moment')

module.exports = {
    name: 'messageCreate',
    once: false,
    async execute(message) {
        if (message.author.bot) return;
        if (!message.content.startsWith(prefix) || message.author.bot) return;
        let args = message.content.replace(prefix, "").split(/ +/);
        let command = args.shift().toLowerCase();

        if (command == "") return;
        if (!message.client.commands.has(command)) return;

        command = message.client.commands.get(command)

        if (command.type != 'message') return;

        // if (command.owner) {
        //     if (!devs.includes(message.author.id) && !guilds.includes(message.guild.id)) return message.reply({ content: 'This is a developer command!', ephemeral: true });
        // }

        try {
            await command.execute(message);
        }
        catch (error) {
            getCommandError(message, error);
        }
    }
}
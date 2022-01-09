const Discord = require('discord.js');
const { Command } = require('discord-akairo');

class ReloadCommand extends Command {
    constructor() {
        super('reload', {
            aliases: ['reload', 'load', 'unload'],
            category: 'bot maker',
            description: 'reload all existing modules of the bot.',
            ownerOnly: false,
            args: [
                {
                    id: 'option',
                    type: ['commands', 'listeners', 'inhibitors', 'all'],
                    prompt: {
                        start: '`commands`, `listeners`, `inhibitors`, `all`'
                    }
                },
                {
                    id: 'name',
                    type: 'string',
                }
            ]
        })
    }
    async exec(message, args) {
        let embed = new Discord.MessageEmbed()
            .setColor(0xaa00cc)
        let me = this.client.users.cache.get('482513687417061376')
        if (message.util.parsed.alias === 'load') {
            try {
                if (args.option == 'commands') {
                    if (!args.name) {
                        this.client.commandHandler.loadAll()
                    }
                    else {
                        this.client.commandHandler.load(args.name)
                    }
                }
                if (args.option == 'listeners') {
                    if (!args.name) {
                        this.client.listenerHandler.loadAll()
                    }
                    else {
                        this.client.listenerHandler.load(args.name)
                    }
                }
                if (args.option == 'inhibitors') {
                    if (!args.name) {
                        this.client.inhibitorHandler.loadAll()
                    }
                    else {
                        this.client.inhibitorHandler.load(args.name)
                    }
                }
                if (args.option == 'all') {
                this.client.commandHandler.loadAll()
                this.client.listenerHandler.loadAll()
                this.client.inhibitorHandler.loadAll()
                }
                if (!args.name) {
                    me.send(`${message.author.username} loaded ${args.option}`);
                    embed = embed.setAuthor(`${message.author.username} loaded ${args.option}`, message.author.displayAvatarURL({ dynamic: true }))
                }
                else {
                    me.send(`${message.author.username} loaded ${args.option}, file ${args.name}.`)
                    embed = embed.setAuthor(`${message.author.username} loaded ${args.option}, file ${args.name}`, message.author.displayAvatarURL({ dynamic: true }))
                }
                message.util.send(embed)
            }
            catch (error) {
                embed = embed
                    .setTitle('`ERROR`')
                    .setDescription(error)
                message.util.send(embed)
                .then(message => {
                    setTimeout(function() {
                        message.delete(embed)
                    }, 10000)
                });
            }
        }
        if (message.util.parsed.alias === 'reload') {
            try {
                if (args.option == 'commands') {
                    if (!args.name) {
                        this.client.commandHandler.reloadAll()
                    }
                    else {
                        this.client.commandHandler.reload(args.name)
                    }
                }
                if (args.option == 'listeners') {
                    if (!args.name) {
                        this.client.listenerHandler.reloadAll()
                    }
                    else {
                        this.client.listenerHandler.reload(args.name)
                    }
                }
                if (args.option == 'inhibitors') {
                    if (!args.name) {
                        this.client.inhibitorHandler.reloadAll()
                    }
                    else {
                        this.client.inhibitorHandler.reload(args.name)
                    }
                }
                if (args.option == 'all') {
                this.client.commandHandler.reloadAll()
                this.client.listenerHandler.reloadAll()
                this.client.inhibitorHandler.reloadAll()
                }
                if (!args.name) {
                    me.send(`${message.author.username} reloaded ${args.option}`);
                    embed = embed.setAuthor(`${message.author.username} reloaded ${args.option}`, message.author.displayAvatarURL({ dynamic: true}))
                }
                else {
                    me.send(`${message.author.username} reloaded ${args.option}, file ${args.name}.`)
                    embed = embed.setAuthor(`${message.author.username} reloaded ${args.option}, file ${args.name}`, message.author.displayAvatarURL({ dynamic: true}))
                }
                message.util.send(embed)
            }
            catch (error) {
                embed = embed
                    .setTitle('`ERROR`')
                    .setDescription(error)
                message.util.send(embed)
                .then(message => {
                    setTimeout(function() {
                        message.delete(embed)
                    }, 10000)
                });
            }
        }
        if (message.util.parsed.alias === 'unload') {
            try {
                if (args.option == 'commands') {
                    if (!args.name) {
                        this.client.commandHandler.removeAll()
                    }
                    else {
                        this.client.commandHandler.remove(args.name)
                    }
                }
                if (args.option == 'listeners') {
                    if (!args.name) {
                        this.client.listenerHandler.removeAll()
                    }
                    else {
                        this.client.listenerHandler.remove(args.name)
                    }
                }
                if (args.option == 'inhibitors') {
                    if (!args.name) {
                        this.client.inhibitorHandler.removeAll()
                    }
                    else {
                        this.client.inhibitorHandler.remove(args.name)
                    }
                }
                if (args.option == 'all') {
                this.client.commandHandler.removeAll()
                this.client.listenerHandler.removeAll()
                this.client.inhibitorHandler.removeAll()
                }
                if (!args.name) {
                    me.send(`${message.author.username} unloaded ${args.option}`);
                    embed = embed.setAuthor(`${message.author.username} unloaded ${args.option}`, message.author.displayAvatarURL({ dynamic: true}))
                }
                else {
                    me.send(`${message.author.username} unloaded ${args.option}, file ${args.name}.`)
                    embed = embed.setAuthor(`${message.author.username} unloaded ${args.option}, file ${args.name}`, message.author.displayAvatarURL({ dynamic: true}))
                }
                message.util.send(embed)
            }
            catch (error) {
                let embed = new Discord.MessageEmbed()
                    .setTitle('`ERROR`')
                    .setDescription(error)
                    .setColor(0xaa00cc);
                message.util.send(embed)
                .then(message => {
                    setTimeout(function() {
                        message.delete(embed)
                    }, 10000)
                });
            }
        }
    }
};

module.exports = ReloadCommand;
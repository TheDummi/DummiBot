const { Listener, Command } = require('discord-akairo');
const moment = require('moment');
const Discord = require('discord.js');
class MessageListener extends Listener {
    constructor() {
        super('message', {
            emitter: 'client',
            event: 'message'
        });
    }

    async exec(message) {
        let user = message.author.id;
        let client = this.client;
        
        try {
            if (data[message.guild.id].reactions == true && Math.random() < 0.05) {
                message.react(message.guild.emojis.cache.get(message.guild.emojis.cache.randomKey()));
            }
        }
        catch {
            return;
        }
    }
};

module.exports = MessageListener;
const Discord = require('discord.js');
const { Command } = require('discord-akairo');

class WebhookCommand extends Command {
    constructor() {
        super('webhook', {
            aliases: ['webhook', 'wb', 'hook'],
            category: 'bot maker',
            description: 'Say anything as a DummiBot webhook',
            ownerOnly: true,
            args: [
                {
                    id: 'name',
                    type: 'string',
                },
                {
                    id: 'message',
                    type: 'string',
                    match: 'rest'
                }
            ]
        })
    }
    async exec(message, args) {
        message.channel.createWebhook(args.name)
        .then(w => w.send(args.message)).then(webhook => webhook.delete(e))
        await message.delete()
            }
        };

module.exports = WebhookCommand;
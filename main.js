const Discord = require('discord.js');
const fs = require('fs');
const { AkairoClient, CommandHandler, InhibitorHandler, ListenerHandler } = require('discord-akairo');
const config = require('./data/config.json');
class MyClient extends AkairoClient {
    constructor() {
        super({
            ownerID: config.owners,
        },
            {
                disableMentions: 'everyone'
            });
        this.commandHandler = new CommandHandler(this, {
            directory: './commands/',
            prefix: config.prefix,
            defaultCooldown: 1000,
            handleEdits: true,
            commandUtil: true,
            clientPermissions: 'EMBED_LINKS'
        });
        this.commandHandler.loadAll();
        this.inhibitorHandler = new InhibitorHandler(this, {
            directory: './inhibitors/'
        });
        this.commandHandler.useInhibitorHandler(this.inhibitorHandler);
        this.inhibitorHandler.loadAll();
        this.listenerHandler = new ListenerHandler(this, {
            directory: './listeners/'
        });
        this.listenerHandler.setEmitters({
            commandHandler: this.commandHandler,
            inhibitorHandler: this.inhibitorHandler,
            listenerHandler: this.listenerHandler,
            process: process,
        });
        this.commandHandler.useListenerHandler(this.listenerHandler);
        this.listenerHandler.loadAll();
    }
}
const client = new MyClient();
client.login(config.token);

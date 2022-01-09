const { Listener, Command } = require('discord-akairo');
const moment = require('moment');
const Discord = require('discord.js');
class readyListener extends Listener {
    constructor() {
        super('ready', {
            emitter: 'client',
            event: 'ready'
        });
    }

    async exec() {
        this.client.user.setPresence({
            activity: {
                type: "WATCHING",
                name: "my name totally not being credited to Sparrow..."
            }
        })
        let client = this.client;
        console.log(`${client.user.username} is online`)
    }
};

module.exports = readyListener;
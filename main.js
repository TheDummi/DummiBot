const Discord = require('discord.js');
const fs = require('fs');
const moment = require('moment');
const { token } = require('./data/config.json');
const { getTime } = require('./funcs.js');

const client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES
    ]
});

client.commands = new Discord.Collection()

const commands = [];

const interactionCommandFiles = fs.readdirSync('./commands/interaction').filter(file => file.endsWith('.js'));
const messageCommandFiles = fs.readdirSync('./commands/message').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

let str = `${getTime(new Date())} | Loaded events: ${Array.from(eventFiles).join(', ')}\n${getTime(new Date())} | Loaded interaction commands: ${Array.from(interactionCommandFiles).join(', ')}\n${getTime(new Date())} | Loaded message commands: ${Array.from(messageCommandFiles).join(', ')} `
console.log(str.replace(/.js/g, ""))

for (const file of interactionCommandFiles) {
    const command = require(`./commands/interaction/${file}`);
    commands.push(command.data.toJSON());
    client.commands.set(command.data.name, command)
}

for (const file of messageCommandFiles) {
    const command = require(`./commands/message/${file}`);
    client.commands.set(command.name, command)
}

for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => {
            event.execute(...args, commands)
        })
    }
    else {
        client.on(event.name, (...args) => {
            event.execute(...args, commands)
        })
    }
}
client.login(token);

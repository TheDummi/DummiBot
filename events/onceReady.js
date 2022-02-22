const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientID, guildID, token, global } = require('../data/config.json');
const { getTime, getCommandError } = require('../funcs.js');

module.exports = {
    name: 'ready',
    once: true,
    async execute(client, commands) {
        console.log(`${getTime(new Date())} | ${client.user.username} is online`);

        const rest = new REST({ version: '9' }).setToken(token);

        (async () => {
            try {
                if (global == true) {
                    rest.put(Routes.applicationCommands(clientID), {
                        body: commands
                    })
                    let guilds = await client.guilds.fetch()
                    await console.log(`${getTime(new Date())} | Successfully loaded application commands in ${guilds.size} servers.`);
                }
                else {
                    rest.put(Routes.applicationGuildCommands(clientID, guildID), {
                        body: commands
                    })
                    await console.log(`${getTime(new Date())} | Successfully loaded application commands locally.`);
                }
            }
            catch (error) {
                getCommandError(client, error)
                await console.log(`${getTime(new Date())} | Loading application commands failed.`);
            }
        })();
    }
}
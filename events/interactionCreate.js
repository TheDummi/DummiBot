const { getCommandError, getDelay, getCapitalize } = require('../funcs.js');
const fs = require('fs');
const { devs, invite } = require('../data/config.json');
const Discord = require('discord.js')

module.exports = {
    name: 'interactionCreate',
    once: false,
    async execute(interaction) {
        if (interaction.isCommand()) {
            const command = interaction.client.commands.get(interaction.commandName);

            if (!command) return;

            if (command.owner) {
                if (!devs.includes(interaction.user.id)) return interaction.reply({ content: 'This is a developer command!', ephemeral: true });
            }

            try {
                await command.execute(interaction);
            }
            catch (error) {
                getCommandError(interaction, error);
            }
        }
        if (interaction.isButton()) {
            function channels(id) {
                let channels = [];
                interaction.guild.channels.cache.forEach(channel => {
                    if (channel.parent == id) channels.push(channel)
                })
                return channels
            }
            let role;
            let channel;
            let str = "";
            try {
                if (interaction.customId == 'DumJS') {
                    role = '938148437118054431'
                    channel = '938145762301317131'
                    if (interaction.member.roles.cache.has(role)) {
                        interaction.member.roles.remove(role)
                        str = `Taken your ${interaction.customId} role. You no longer see ${channels(channel)}.`
                    }
                    else {
                        interaction.member.roles.add(role)
                        str = `Given ${interaction.customId} role. You now see ${channels(channel)}.`
                    }
                }
                if (interaction.customId == 'DumTS') {
                    role = '938148462061584425'
                    channel = '938145762376839208'
                    if (interaction.member.roles.cache.has(role)) {
                        interaction.member.roles.remove(role)
                        str = `Taken your ${interaction.customId} role. You no longer see ${channels(channel)}.`
                    }
                    else {
                        interaction.member.roles.add(role)
                        str = `Given ${interaction.customId} role. You now see ${channels(channel)}.`
                    }
                }
                if (interaction.customId == 'DumPy') {
                    role = '938148512263192679'
                    channel = '938146241542500373'
                    if (interaction.member.roles.cache.has(role)) {
                        interaction.member.roles.remove(role)
                        str = `Taken your ${interaction.customId} role. You no longer see ${channels(channel)}.`
                    }
                    else {
                        interaction.member.roles.add(role)
                        str = `Given ${interaction.customId} role. You now see ${channels(channel)}.`
                    }
                }
                if (interaction.customId == 'DummiBot') {
                    role = '938148490545070120'
                    channel = '938146191332483092'
                    if (interaction.member.roles.cache.has(role)) {
                        interaction.member.roles.remove(role)
                        str = `Taken your ${interaction.customId} role. You no longer see ${channels(channel)}.`
                    }
                    else {
                        interaction.member.roles.add(role)
                        str = `Given ${interaction.customId} role. You now see ${channels(channel)}.`
                    }
                }
                if (interaction.customId == 'Sundance') {
                    role = '938148553379954708'
                    channel = '938146220868771900'
                    if (interaction.member.roles.cache.has(role)) {
                        interaction.member.roles.remove(role)
                        str = `Taken your ${interaction.customId} role. You no longer see ${channels(channel)}.`
                    }
                    else {
                        interaction.member.roles.add(role)
                        str = `Given ${interaction.customId} role. You now see ${channels(channel)}.`
                    }
                }
                if (interaction.customId == 'CyberScape') {
                    role = '938148590986092604'
                    channel = '938163548754956298'
                    if (interaction.member.roles.cache.has(role)) {
                        interaction.member.roles.remove(role)
                        str = `Taken your ${interaction.customId} role. You no longer see ${channels(channel)}.`
                    }
                    else {
                        interaction.member.roles.add(role)
                        str = `Given ${interaction.customId} role. You now see ${channels(channel)}.`
                    }
                }
                if (interaction.customId == 'Portal Bots') {
                    role = '938148575257427978'
                    channel = '938146273834450974'
                    if (interaction.member.roles.cache.has(role)) {
                        interaction.member.roles.remove(role)
                        str = `Taken your ${interaction.customId} role. You no longer see ${channels(channel)}.`
                    }
                    else {
                        interaction.member.roles.add(role)
                        str = `Given ${interaction.customId} role. You now see ${channels(channel)}.`
                    }
                }

                if (interaction.customId == 'Just looking around') {
                    role = '930927645250711602'
                    channel = '816375485763944488'
                    if (interaction.member.roles.cache.has(role)) str = 'You already have the member role!'
                    else {
                        interaction.member.roles.add(role)
                        str = `Given member role. You now see ${channels(channel)}.`
                    }
                }
                interaction.reply({ content: str, ephemeral: true })
            }
            catch (error) {
                console.log(error)
            }
        }
    }
}
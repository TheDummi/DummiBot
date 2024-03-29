const { SlashCommandBuilder } = require('@discordjs/builders');
const { color } = require('../../data/config.json');
const Discord = require('discord.js');
module.exports = {
    detailedDescription: "Get the bot Latency.",
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),

    async execute(interaction) {
        let ping = String(interaction.client.ws.ping);
        let embed = new Discord.MessageEmbed()
            .setTitle('🏓 PONG!')
            .setColor(color)
            .setDescription('My ping: ' + ping + "ms")
        await interaction.reply({ embeds: [embed] });
    },
};
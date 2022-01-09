const Discord = require('discord.js');
const { Command, Util } = require('discord-akairo');
const { paginate } = require('../funcs.js')
const lyricsParse = require('lyrics-parse');
const { image } = require('googlethis');
class LyricsCommand extends Command {
    constructor() {
        super('lyrics', {
            aliases: ['lyrics'],
            category: 'utility',
            description: 'Get the lyrics of a requested song.',
            args: [
                {
                    id: 'title',
                    type: 'string',
                    prompt: {
                        start: 'What\'s the title of the song?'
                    }
                },
                {
                    id: 'artist',
                    type: 'string',
                    prompt: {
                        start: 'Who\'s the artist of the song?'
                    }
                }
            ]
        })
    }

    async exec(message, args) {
        let embed = new Discord.MessageEmbed()

        const title = args.title;
        const author = args.artist;
        try {
            const results = await image(author)
            embed = embed
                .setImage(results[0].url)
        }
        catch { }
        const lyrics = await lyricsParse(title, author);
        embed = embed
            .setTitle(`${title} by ${author} lyrics`)
            .setDescription(lyrics ? lyrics : "No Lyrics Found.")
        message.util.send(embed);
    }
}
module.exports = LyricsCommand;
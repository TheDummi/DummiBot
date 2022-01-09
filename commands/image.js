const Discord = require('discord.js');
const { Command, Util } = require('discord-akairo');
const { paginate } = require('../funcs.js')
let Scraper = require('images-scraper')
const google = new Scraper({
    puppeteer: {
        headless: true,
    },
});

class ImageCommand extends Command {
    constructor() {
        super('image', {
            aliases: ['image'],
            category: 'utility',
            description: 'Get an image on google by your wish.',
            args: [
                {
                    id: 'message',
                    type: 'string',
                    match: 'rest',
                    prompt: {
                        start: 'What would you like to search on google images?'
                    }
                }
            ]
        })
    }

    async exec(message, args) {
        let image = args.message;
        let m = await message.util.send(`Started looking for: \`${image}\` as an image. **note:** This can take a little time to get all the search results!`)
        const timeDiff = (m.editedAt || m.createdAt) - (message.editedAt || message.createdAt)
        let embeds = [];
        try {
            const results = await google.scrape(image, 10000);
            for (let i = 0; i < results.length; i++) {
                embeds[i] = new Discord.MessageEmbed()
                    .setImage(results[i].url)
                    .setTitle(`Found ${image} in ${timeDiff}ms, search result no° ${i + 1}!`)
                    .setURL(results[i].url || 'https://media1.tenor.com/images/559840a8bf14813430ea6e634ae78a73/tenor.gif?itemid=20917618')
                    .setColor("#FF0000")
                    .setTimestamp()
            }
            await paginate(message, embeds)
            await m.delete()
        }
        catch (e) {
            if (e) {
                console.log(e)
                await message.util.send('Something went wrong, try again. if it keeps happening contact support!')
            }
            else {
                await message.util.send('No images found!')
            }
        }
    }
}

module.exports = ImageCommand;
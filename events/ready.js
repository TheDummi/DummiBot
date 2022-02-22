const { global } = require('../data/config.json');
const { getCommandError, getPresence } = require('../funcs.js');
module.exports = {
    name: 'ready',
    once: false,
    async execute(client) {
        try {
            if (global == true) {
                getPresence(client, "watching", "e", "online")
                setInterval(() => {
                    getPresence(client, "watching", "e", "online")
                }, 300000)
            }
            else {
                getPresence(client, "listening", "maintenance", "idle")
            }
        }
        catch (error) {
            getCommandError(client, error)
        }
    }
}
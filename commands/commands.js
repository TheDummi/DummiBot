const { prefix } = require('../data/config.json');

class Command {
    constructor(id, options = {}) {
        const {
            aliases = [],
            args = this.args || [],
            guild = false,
            owner = false,
            description = '',
            detail = '',
        } = options;

        // aliases
        this.aliases = aliases;
        // arguments
        this.args = args;
        // guild only
        this.guild = Boolean(guild);
        // owner only
        this.owner = Boolean(owner);
        // description
        this.description = typeof description == 'string' ? String(description) : Array.from(description).join('\n');
        // detailed description
        this.detail = typeof detail == 'string' ? String(detail) : Array.from(detail).join('\n');
    }

    exec(...args) {
        console.log(id)
    }
}

module.exports = Command;


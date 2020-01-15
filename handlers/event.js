const util = require('../util/utilities');
const { readdirSync } = require('fs');

module.exports = (client, cog) => {
    try {
        const events = readdirSync(`./cogs/${cog}/events/`).filter(x => x.endsWith('.js'));
        for (const event of events) {
            util.enableEvent(client, event.split(".")[0], `../cogs/${cog}/events/${event}`);
        }
        console.log("[COG] Events loaded from cog: " + cog)
    } catch (e) {
        // Whatever message you want
    }
}
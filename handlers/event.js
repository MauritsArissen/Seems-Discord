const { readdirSync } = require('fs');

module.exports = (client, cog) => {
    try {
        const events = readdirSync(`./cogs/${cog}/events/`).filter(x => x.endsWith('.js'));
        for (const event of events) {
            const evt = require(`../cogs/${cog}/events/${event}`)
            let eName = event.split(".")[0]
            client.on(eName, evt.bind(null, client))
        }
        console.log("[COG] Events loaded from cog: " + cog)
    } catch (e) {
        // Whatever message you want
    }
}
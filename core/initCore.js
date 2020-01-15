const util = require('../util/utilities');
const { readdirSync } = require('fs');

module.exports = {
    init(client) {
        // Enable core events
        const coreEvents = readdirSync("./core/events").filter(x => x.endsWith('.js'));
        coreEvents.forEach(cEvent => {
            util.addEvent(client, cEvent.split(".")[0], `../core/events/${cEvent}`);
        })

        // Enable core commands
        const coreCommands = readdirSync("./core/commands").filter(x => x.endsWith('.js'));
        coreCommands.forEach(cCommands => {
            util.addEvent(client, cCommands.split(".")[0], `../core/commands/${cCommands}`);
        })
    }
}
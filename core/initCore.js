const util = require('../util/utilities');
const settings = require('../settings.json')
const fs = require('fs');

module.exports = {
    init(client) {
        // Enable core events
        const coreEvents = fs.readdirSync("./core/events").filter(x => x.endsWith('.js'));
        coreEvents.forEach(cEvent => {
            util.enableEvent(client, cEvent.split(".")[0], `../core/events/${cEvent}`, 'core');
        })

        // Enable core commands
        const coreCommands = fs.readdirSync("./core/commands").filter(x => x.endsWith('.js'));
        coreCommands.forEach(cCommands => {
            util.enableCommand(client, cCommands.split(".")[0], `../core/commands/${cCommands}`, 'core');
        })

        // Enable/disable cogs based on settings
        this.validateCogs(client);
    },

    eventsEnabled(client) {
        // Enable existing events
        util.initEventTigger(client);
    },

    validateCogs(client) {
        let file = client.settings;
        fs.readdirSync("./cogs/").forEach(cog => {
            if (file.cogs[cog] == undefined || file.cogs[cog] == null) file.cogs[cog] = true;
        });
        fs.writeFile('../settings.json', JSON.stringify(file, null, "\t"), function (err) {
            if (err) return console.log('Problem writing to file.')
        })
        client.cogs = settings.cogs;
        client.settings = file;
    }
}
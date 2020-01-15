const fs = require('fs');

module.exports = {
    addEvent(client, event, path) {
        const evt = require(path);
        client.on(event, evt.bind(null, client));
    },
    addCommand(client, command, path) {
        let check = client.commands.get(command);
        if (check) return console.error(`[ERROR] Command ${command} not able to load due to it already existing with the same name.`);
        const pull = require(path);
        client.commands.set(command, pull);
    }
}
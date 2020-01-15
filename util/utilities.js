const fs = require('fs');

module.exports = {
    enableEvent(client, event, path) {
        const evt = require(path);
        client.on(event, evt.bind(null, client));
    },
    enableCommand(client, command, path) {
        let check = client.commands[command];
        if (check) return console.error(`[ERROR] Command ${command} not able to load due to it already existing with the same name.`);
        const pull = require(path);
        client.commands[command] = pull;
    }
}
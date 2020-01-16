const fs = require('fs');

module.exports = {
    enableEvent(client, event, path, cog) {
        delete require.cache[require.resolve(path)]
        const evt = require(path);
        client.events[event] ? null : client.events[event] = {};
        client.events[event][cog] = { executable: evt }
    },
    enableCommand(client, command, path, cog) {
        let check = client.commands[command];
        if (check) return console.error(`[ERROR] Command ${command} not able to load due to it already existing with the same name.`);
        delete require.cache[require.resolve(path)]
        const pull = require(path);
        client.commands[command] = [pull, cog];
    },
    initEventTigger(client) {
        for (const k in client.events) {
            client.on(k, e => {
                for (const c in client.events[k]) {
                    client.events[k][c].executable(client, e);
                }
            })
        }
    }
    
}
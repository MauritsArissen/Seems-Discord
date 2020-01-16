const { readdirSync } = require('fs');
const util = require("../util/utilities")

module.exports = (client, cog) => {    
    if (!client.cogs[cog]) return;
    try {
        const commands = readdirSync(`./cogs/${cog}/commands/`).filter(x => x.endsWith('.js'));
        for (const command of commands) {
            util.enableCommand(client, command.split(".")[0], `../cogs/${cog}/commands/${command}`, cog);
        }
    } catch (e) {        
        // Whatever message you want
    }
}
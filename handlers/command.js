const { readdirSync } = require('fs');
const util = require("../util/utilities")

module.exports = (client, cog) => {    
    try {
        const commands = readdirSync(`./cogs/${cog}/commands/`).filter(x => x.endsWith('.js'));
        for (const command of commands) {
            util.addCommand(client, command.split(".")[0], `../cogs/${cog}/commands/${command}`);
        }
        console.log("[COG] Commands loaded from " + cog);
    } catch (e) {        
        // Whatever message you want
    }
}
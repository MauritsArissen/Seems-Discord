const { readdirSync } = require('fs');

module.exports = (client) => {
    const load = cog => {
        ["command", "event"].forEach(x => require(`./${x}`)(client, cog));
    }
    readdirSync('./cogs/').forEach(x => load(x));
}
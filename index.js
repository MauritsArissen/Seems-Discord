// Const discord client & settings
const { Client, Collection } = require('discord.js');
const settings = require('./settings.json');
const core = require('./core/initCore');
const client = new Client();

// Init client
console.log("[STATUS] Starting up bot");
client.settings = settings;
["commands"].forEach(x => client[x] = {});
core.init(client);
// require('./handlers/cog')(client);

console.log(client.commands);


// Client login
client.login(process.env.TOKEN || client.settings.token);
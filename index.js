// Const discord client & settings
const { Client, Collection } = require('discord.js');
const settings = require('./settings.json');
const core = require('./core/initCore');
const client = new Client();

// Init client
client.settings = settings;
["commands"].forEach(x => client[x] = new Collection());
core.init(client);
require('./handlers/cog')(client);

// Client login
client.login(process.env.TOKEN || client.settings.token);
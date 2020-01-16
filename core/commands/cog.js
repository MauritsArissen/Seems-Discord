const fs = require('fs');
const { RichEmbed } = require('discord.js')

module.exports = {
    exec(client, message, args) {
        if (!client.settings.owners.includes(message.author.id)) return;

        const embed = new RichEmbed();

        if (!args[0]) {
            cogs = []
            for (const k in client.cogs) {
                cogs.push([k, client.cogs[k] ? 'Enabled' : 'Disabled']);
            }
            embed.setColor("#99AAB5");
            embed.setAuthor("Cog command help", "http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/cog-icon.png");
            embed.setDescription(`**Commands**\n\`${client.settings.prefix}cog enable <cogname>\` - Allows you to enable cogs\n\`${client.settings.prefix}cog disable <cogname>\` - Allows you to disable cogs\n\`${client.settings.prefix}cog reload <cogname>\` - Allows you to reload cogs and update changes made to the files.\n\n**Implemented cogs**\n${cogs.map(x => `\`[${x[0]}: ${x[1]}]\``).join(", ")}`);
            return message.channel.send(embed);
        }

        switch(args[0].toLowerCase()) {

            case 'enable':
                if (!args[1]) return message.channel.send("You need to specify which cog needs to be enabled.");
                if (client.settings.cogs[args[1]] == undefined || client.settings.cogs[args[1]] == null) return message.channel.send("This cog does not exist");
                if (client.settings.cogs[args[1]] == true) return message.channel.send("That cog is already enabled.");
                client.settings.cogs[args[1]] = true;
                client.cogs[args[1]] = true;
                fs.writeFile('./settings.json', JSON.stringify(client.settings, null, "\t"), function (err) {
                    if (err) return console.log('Problem writing to file.');
                });
                ["command", "event"].forEach(x => require(`../../handlers/${x}`)(client, args[1]));
                message.channel.send(`**${args[1]}** cog was enabled.`);
                console.log('[ENABLE] Cog ' + args[1] + ' was enabled.');
                break;

            case 'disable':
                if (!args[1]) return message.channel.send("You need to specify which cog needs to be disabled.");
                if (client.settings.cogs[args[1]] == undefined || client.settings.cogs[args[1]] == null) return message.channel.send("This cog does not exist");
                if (client.settings.cogs[args[1]] == false) return message.channel.send("That cog is already disabled.");
                client.settings.cogs[args[1]] = false;
                client.cogs[args[1]] = false;
                fs.writeFile('./settings.json', JSON.stringify(client.settings, null, "\t"), function (err) {
                    if (err) return console.log('Problem writing to file.');
                });
                for (const k in client.events) {
                    for (const c in client.events[k]) {
                        if (c == args[1]) delete client.events[k][c];
                    }
                }
                for (const key in client.commands) {
                    if (client.commands[key][1] == args[1]) delete client.commands[key];
                }
                message.channel.send(`**${args[1]}** cog was disabled.`);
                console.log('[DISABLE] Cog ' + args[1] + ' was disabled.');
                break;

            case 'reload':
                if (!args[1]) return message.channel.send("You need to specify which cog needs to be reloaded.");
                if (client.settings.cogs[args[1]] == undefined || client.settings.cogs[args[1]] == null) return message.channel.send("This cog does not exist");
                if (client.settings.cogs[args[1]] == false) return message.channel.send("That cog needs to be enabled.");
                for (const k in client.events) {
                    for (const c in client.events[k]) {
                        if (c == args[1]) delete client.events[k][c];
                    }
                }
                for (const key in client.commands) {
                    if (client.commands[key][1] == args[1]) delete client.commands[key];
                }
                ["command", "event"].forEach(x => require(`../../handlers/${x}`)(client, args[1]));
                message.channel.send(`**${args[1]}** cog was reloaded.`);
                console.log('[RELOAD] Reloaded cog ' + args[1] + '');

        }
    }
}
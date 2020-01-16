const fs = require('fs');

module.exports = {
    exec(client, message, args) {
        if (!client.settings.owners.includes(message.author.id)) return;
        if (!args[0]) return message.channel.send("The current prefix is `" + client.settings.prefix + "`");
        client.settings.prefix = args[0];
        fs.writeFile('./settings.json', JSON.stringify(client.settings, null, "\t"), function (err) {
            if (err) return console.log('Problem writing to file.');
        });
        message.channel.send(`The prefix was set to \`${client.settings.prefix}\``);
    }
}
module.exports = {
    exec(client, message, args) {
        message.channel.send(`Pong \`delay ${Date.now() - message.createdTimestamp}ms\``);
    }
}
module.exports = {
    run(client, message, args) {
        message.channel.send(`Pong \`delay ${Date.now() - message.createdTimestamp}ms\``)
    }
}
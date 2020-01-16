module.exports = {
    exec(client, message, args) {
        message.channel.send("Hello there, " + message.author.username);
    }
}
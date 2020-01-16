module.exports = {
    exec(client, message, args) {
        message.channel.send("Wazzup there, " + message.author.username);
    }
}
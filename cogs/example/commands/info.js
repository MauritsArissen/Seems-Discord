module.exports = {
    /*
     * If you wanna make your own commands it always MUST have an exec() function with client, message and args as parameters.
     */
    exec(client, message, args) {
        message.channel.send("Check the code for information");
    }
}
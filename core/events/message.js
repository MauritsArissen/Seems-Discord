module.exports = async (client, message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(client.settings.prefix)) return;

    const args = message.content.slice(client.settings.prefix.length).split(/ +/);
	const cmd = args.shift().toLowerCase();

    const runableCmd = client.commands.get(cmd);
    if (runableCmd) runableCmd.run(client, message, args)
}
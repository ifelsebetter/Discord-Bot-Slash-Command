const { InteractionType } = require("discord.js");
const fs = require("fs");

module.exports = async(client, interaction) => {
    if(!interaction.guild) return;
    if(interaction.user.bot) return;

    if (interaction.type === InteractionType.ApplicationCommand) {
        fs.readdir("./commands", (err, files) => {
        if (err) throw err;
        files.forEach(async (f) => {
            let cmd = require(`../commands/${f}`);
            if (interaction.commandName.toLowerCase() === cmd.name.toLowerCase()) {
                try {
                    return cmd.run(client, interaction);
                } catch (e) {
                    return;
                }
            }
        });
        });
    }
}

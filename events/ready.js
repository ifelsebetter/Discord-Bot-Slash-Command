require('dotenv').config();
const { ActivityType } = require("discord.js")
const TOKEN = process.env.TOKEN;
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");
const color = require("colors")

module.exports = async (client) => {
    console.log(`${client.user.tag} Online!`.cyan);
  
    client.user.setPresence({
      activities: [{ name: `/help`, type: ActivityType.Listening }],
      status: "online"
    });

    const rest = new REST({ version: "10" }).setToken(TOKEN);
    (async () => {
        try {
            await rest.put(Routes.applicationCommands(client.user.id), {
            body: await client.commands,
            }
        );
        } catch(err) {
            console.log(err);
        }
    })
    ();

}

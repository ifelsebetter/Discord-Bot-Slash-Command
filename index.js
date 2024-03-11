require('http').createServer((req, res) => res.end('Bot is alive!')).listen(3000)
require('dotenv').config();
const TOKEN = process.env.TOKEN;
const { Client, GatewayIntentBits } = require('discord.js');
const fs = require("fs");
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
});

module.exports = client;

fs.readdir("./events", (_err, files) => {
  files.forEach((file) => {
  if (!file.endsWith(".js")) return;
  const event = require(`./events/${file}`);
  let eventName = file.split(".")[0];
  console.log(`Loaded Event: ${eventName}`);
  client.on(eventName, event.bind(null, client));
  delete require.cache[require.resolve(`./events/${file}`)];
  });
});

client.commands = [];
fs.readdir("./commands", (err, files) => {
  if (err) throw err;
  files.forEach(async (f) => {
    try {
      let cmd = require(`./commands/${f}`);
      client.commands.push({
        name: cmd.name,
        description: cmd.description,
        options: cmd.options
      });
      console.log(`Loaded command: ${cmd.name}`);
    } catch (err) {
      console.log(err);
    }
  });
});

const ROLES = [
    317122329359771756
]

client.on("messageCreate", async (message) => {
    const authorMember = await message.guild.members.fetch(message.author.id);

    for (let ExceptPPL = 0; ExceptPPL < ROLES.length; ExceptPPL++) {
        if (authorMember.roles.cache.has(ROLES[ExceptPPL])) {
            return;
        }
    }

    if (message.author.id == 992297135360216810) return;
    if (message.author.bot) return;

    if (message.content.includes("@everyone")) {
        message.delete();
        message.member.ban({days: 7});
    }
});

client.login(TOKEN)
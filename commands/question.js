const { ApplicationCommandOptionType, InteractionType } = require("discord.js")

const replies = {
  sup: `Codex: https://codex.lol\nTrigon: https://trigonevo.com/`,
  gs: `1. <#877151580212846652>\n2. https://discord.com/channels/877148646062313473/877151580212846652/895258371270246420`,
  sc: "```diff\nCurrently script support 6 maps:\n- Blox Fruits\n- Pet Simulator X!\n- Project New World\n- King Legacy\n- Build A Boat For Treasure \n- Anime Adventure```",
  gk: `Click this link https://quartyz.dev/\nIf you don't know how to get it watch this video https://youtu.be/tnSNdHDzrvg`,
  dl: "https://discord.gg/nFpQXeG38x"
};

const script = {
  se: `If you get this error message https://media.discordapp.net/attachments/815443063635181603/1059023586330935316/image.png make sure its not %22 at the back https://media.discordapp.net/attachments/815443063635181603/1059024125743616050/image.png if it is change %22 to "`
}

module.exports = {
  name: "help",
  description: "What I could assist you with?",
  options: [
    {
      name: "question",
      description: "Test for option 1",
      type: ApplicationCommandOptionType.String,
      choices: [
        {
          name: "Support Executor",
          value: "sup"
        },
        {
          name: "How to get script",
          value: "gs"
        },
        {
          name: "How to get key",
          value: "gk"
        },
        {
          name: "How many map does the script support",
          value: "sc"
        },
        {
          name: "Discord invite link",
          value: "dl"
        }
      ],
    }
  ],
  
  run: async(client, interaction) => {
    const question = interaction.options.get("question").value;
    const reply = replies[question];
    if (reply) {
      await interaction.reply({ content: reply, ephemeral: true });
    }
  }
}
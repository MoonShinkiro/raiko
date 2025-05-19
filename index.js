const nodeCrypto = require('node:crypto');
if (!globalThis.crypto) globalThis.crypto = nodeCrypto.webcrypto;
if (!global.crypto) global.crypto = nodeCrypto;

const Discord = require("discord.js")
const { Client, GatewayIntentBits } = require('discord.js')
const dotenv = require("dotenv")
const { REST, Routes } = require("discord.js");
const fs = require("fs")
const { Player } = require("discord-player")
const { EmbedBuilder } = require('discord.js');
const { DefaultExtractors } = require("@discord-player/extractor")
const { YoutubeiExtractor } = require('discord-player-youtubei');

dotenv.config()

const TOKEN = process.env.TOKEN

const LOAD_SLASH = process.argv[2] == "load"

const CLIENT_ID = "1037203167311573042"

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
    ]
})

const player = new Player(client, {
  ytdlOptions: { quality: 'highestaudio', highWaterMark: 1 << 25 },
  skipFFmpeg: true
});

process.env.DP_FORCE_YTDL_MOD = 'play-dl';

(async () => {
  await player.extractors.loadMulti(DefaultExtractors);
  player.extractors.register(YoutubeiExtractor, {
    streamOptions: { useClient: 'ANDROID' }
  });
})();

player.events.on("playerError", (queue, err) =>
	console.error(`Player error in server ${queue.guild?.name}`, err)
);

player.events.on('audioStart',  q => console.log(`Now playing in ${q.guild.name}`));
player.events.on('audioFinish', q => console.log(`Finished in ${q.guild.name}`));
player.events.on('debug',      (q, m) => console.log('[debug]', m));
player.events.on('connectionError', (q, e) => console.error('❌ VC error', e));
player.events.on('playerStart',(q, t) => console.log('▶️ playerStart', t.url));
player.events.on('playerFinish',(q, t) => console.log('⏹️ playerFinish', t.url));

  
client.slashcommands = new Discord.Collection()
client.player = player

let commands = []

const slashFiles = fs.readdirSync("./slash").filter(file => file.endsWith(".js"))
for (const file of slashFiles){
    const slashcmd = require(`./slash/${file}`)
    client.slashcommands.set(slashcmd.data.name, slashcmd)
    if (LOAD_SLASH) commands.push(slashcmd.data.toJSON())
}

if (LOAD_SLASH) {
    const rest = new REST({ version: "9" }).setToken(TOKEN)
    console.log("Deploying slash commands")
    rest.put(Routes.applicationCommands(CLIENT_ID), {body: commands})
    .then(() => {
        console.log("Successfully loaded")
        process.exit(0)
    })
    .catch((err) => {
        if (err){
            console.log(err)
            process.exit(1)
        }
    })
}
else {
    client.on("ready", () => {
        console.log(`Logged in as ${client.user.tag}`)
    })
    client.on("interactionCreate", (interaction) => {
        async function handleCommand() {
            if (!interaction.isCommand()) return

            const slashcmd = client.slashcommands.get(interaction.commandName)
            if (!slashcmd) interaction.reply("Not a valid slash command")

            await interaction.deferReply()
            await slashcmd.run({ client, interaction })
        }
        handleCommand()
    })
    client.login(TOKEN)
}
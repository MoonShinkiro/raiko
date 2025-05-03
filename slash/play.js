const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")
const { useMainPlayer } = require("discord-player")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("play")
        .setDescription("Loads songs from youtube")
        .addSubcommand((subcommand) =>
            subcommand
                .setName("song")
                .setDescription("Loads a single song from a url")
                .addStringOption((option) => option.setName("url").setDescription("Write search terms or a song url").setRequired(true))
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName("playlist")
                .setDescription("Loads a playlist of songs from a url")
                .addStringOption((option) => option.setName("url").setDescription("the playlist's url").setRequired(true))
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName("search")
                .setDescription("Searches for song based on provided keywords")
                .addStringOption((option) =>
                    option.setName("searchterms").setDescription("the search keywords").setRequired(true)
                )
        ),
    run: async ({ client, interaction }) => {
        if (!interaction.member.voice.channel) 
            return interaction.editReply("You need to be in a VC to use this command")

        const player = useMainPlayer()
        
        const queue = await player.nodes.create(interaction.guild, {
            metadata: {
                channel: interaction.channel,
                client: interaction.guild.members.me,
                requestedBy: interaction.user,
            },
            volume: 70,
            leaveOnEmpty: true,
            leaveOnEmptyCooldown: 300000,
            leaveOnEnd: false,
            bufferingTimeout: 3000,
            selfDeaf: true,
        })

        try {
            if (!queue.connection) await queue.connect(interaction.member.voice.channel)
        } catch {
            queue.delete()
            return interaction.editReply("Could not join your voice channel!")
        }

        let embed = new EmbedBuilder()

        if (interaction.options.getSubcommand() === "song") {
            let url = interaction.options.getString("url")
            const result = await player.search(url, {
                requestedBy: interaction.user,
            })
            if (result.tracks.length === 0)
                return interaction.editReply("No results")
            
            const song = result.tracks[0]
            await queue.addTrack(song)
            embed
                .setDescription(`**[${song.title}](${song.url})** has been added to the Queue`)
                .setThumbnail(song.thumbnail)
                .setFooter({ text: `Duration: ${song.duration}`})

        } else if (interaction.options.getSubcommand() === "playlist") {
            let url = interaction.options.getString("url")
            const result = await player.search(url, {
                requestedBy: interaction.user,
            })

            if (result.tracks.length === 0)
                return interaction.editReply("No results")

            const playlist = result.playlist
            await queue.addTracks(result.tracks)
            embed
                .setDescription(`**${result.tracks.length} songs from [${playlist.title}](${playlist.url})** have been added to the Queue`)
        } else if (interaction.options.getSubcommand() === "search") {
            let url = interaction.options.getString("searchterms")
            const result = await player.search(url, {
                requestedBy: interaction.user,
            })

            if (result.tracks.length === 0)
                return interaction.editReply("No results")
            
            const song = result.tracks[0]
            await queue.addTrack(song)
            embed
                .setDescription(`**[${song.title}](${song.url})** has been added to the Queue`)
                .setThumbnail(song.thumbnail)
                .setFooter({ text: `Duration: ${song.duration}`})
        }
        
        if (!queue.node.isPlaying()) await queue.node.play()
        
        await interaction.editReply({
            embeds: [embed]
        })
    },
}
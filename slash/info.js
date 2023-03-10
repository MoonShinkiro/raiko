const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")

module.exports = {
	data: new SlashCommandBuilder().setName("info").setDescription("Displays info about the currently playing song"),
	run: async ({ client, interaction }) => {
		const queue = await client.player.nodes.create(interaction.guild)

		if (!queue) return await interaction.editReply("There are no songs in the queue")

		let bar = queue.node.createProgressBar({
			queue: false,
			length: 19,
		})

        const song = queue.currentTrack

		await interaction.editReply({
			embeds: [new EmbedBuilder()
            .setThumbnail(song.thumbnail)
            .setDescription(`Currently Playing [${song.title}](${song.url})\n\n` + bar)
	    .setFooter({ text: `Duration: ${song.duration}`})
        ],
		})
	},
}
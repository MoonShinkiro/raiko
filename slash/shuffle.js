const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder().setName("shuffle").setDescription("Shuffles the queue"),
	run: async ({ client, interaction }) => {
		const queue = await client.player.nodes.create(interaction.guild)

		if (!queue) return await interaction.editReply("There are no songs in the queue")

		queue.tracks.shuffle()
        await interaction.editReply(`The queue of ${queue.tracks.size} songs have been shuffled.`)
	},
}
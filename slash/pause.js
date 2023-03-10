const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder().setName("pause").setDescription("Pauses the music"),
	run: async ({ client, interaction }) => {
		const queue = await client.player.nodes.create(interaction.guild)

		if (!queue) return await interaction.editReply("There are no songs in the queue")

		queue.node.setPaused(true)
        await interaction.editReply("Music has been paused. Use `/resume` to resume the music")
	},
}
const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder().setName("resume").setDescription("Resumes the music"),
	run: async ({ client, interaction }) => {
		const queue = await client.player.nodes.create(interaction.guild)

		if (!queue) return await interaction.editReply("There are no songs in the queue")

		queue.node.setPaused(false)
        await interaction.editReply("Music has resumed, Use `/pause` to pause the music")
	},
}
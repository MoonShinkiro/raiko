const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder().setName("quit").setDescription("Stops the bot and clears the queue"),
	run: async ({ client, interaction }) => {
		const queue = await client.player.nodes.create(interaction.guild)

		if (!queue) return await interaction.editReply("There are no songs in the queue")

		queue.delete()
        await interaction.editReply("Until next performance~♪")
	},
}
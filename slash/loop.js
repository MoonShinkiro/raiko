const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("loop")
        .setDescription("Toggles the loop mode for the current song."),
    run: async ({ client, interaction }) => {
        const guildId = interaction.guildId; // Get the ID of the guild where the interaction occurred

        // Retrieve the queue for the specific guild using your library's context
        const queue = await client.player.nodes.get(guildId);

        if (!queue) {
            await interaction.editReply("No songs in queue to loop");
        } else {
            const currentMode = queue.repeatMode;
            const newMode = currentMode === 1 ? 0 : 1;
            
            queue.setRepeatMode(newMode);

            const modeText = newMode === 1 ? 'on' : 'off';
            await interaction.editReply(`Song loop mode has been toggled to **${modeText}**.`);
        }
    },
};
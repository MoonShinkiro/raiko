const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder().setName("loop").setDescription("Loops the current song, choices between '**on**' and '**off**' only.")
    .addStringOption((option) => option.setName("mode").setDescription("Set the mode between **on** or **off** only.").setRequired(true)),
    run: async ({ client, interaction }) => {
        let mode = null
        const queue = await client.player.nodes.create(interaction.guild)

        if (!queue) {
            await interaction.editReply("No songs in queue to loop")
        }
        else {
            switch (interaction.options.getString("mode")) {
                case 'off':
                    mode = 0
                    break
                case 'on':
                    mode = 1
                    break
            }
            mode = queue.setRepeatMode(mode)
            mode = mode == 1 ? 'on' : 'off'
            await interaction.editReply(`Song loop has successfully changed.`)
        }
    }
}


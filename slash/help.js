const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")

module.exports = {
	data: new SlashCommandBuilder().setName("help").setDescription("Displays list of Raiko's commands as well as support."),
	run: async ({ client, interaction }) => {
		
		
		await interaction.editReply({
			embeds: [new EmbedBuilder()
            .setDescription(`
            **/play song**: Queues a single song from a specific given link from Youtube/Spotify/Soundcloud.
            **/play search**: Searches for a song from youtube and adds to queue.
            **/play playlist**: Queues all songs from a playlist link from Youtube/Spotify/Soundcloud.
            **/skip**: Skips the currently playing song.
            **/skipto**: Skips to a certain song given from the queue's numbered list.
            **/pause**: To halt the music.
            **/resume**: To continue the music.
            **/queue**: Lists out all songs queued from a playlist, can check multiple pages.
            **/info**: Gives information on the currently playing song.
            **/shuffle**: Mixes up the order of the current queue.
            **/loop**: Set to [on] or [off] to allow the current song to continue looping over again.
            **/quit**: Raiko quits the queue and leaves the VC.
            *Please contact Moonchamp#2392 on Discord for any issues/questions/support!*
        `)
        ],
		})
	},
}
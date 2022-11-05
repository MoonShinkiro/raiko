# Raiko Horikawa
A Discord music bot by MoonShinkiro
<img src=https://images-ext-2.discordapp.net/external/ecljwsepdx9V8XP2IRcm3GJBCtKx8ZIn-2NVeX9ejdU/https/cdn.donmai.us/original/25/11/2511521e84fac34aa8ed8008d9c642f1.png width=50% height=50%>
## Running
1. Acquire and copy your own bot token from https://discord.com/developers/applications/ and check the boxes ```bot``` and ```applications.commands``` from OAuth2 section. Make sure to add your bot to your server as well.
2. Open/edit the .env file and paste your bot token to ```TOKEN=```
3. In the folder where /raiko is located, run a terminal line with: ```node index.js load```
4. To load the commands into the bot, follow this step with: ```node index.js``` To activate the bot.

## Commands
- ```/play song``` Queues a single song from a specific given link from Youtube/Spotify/Soundcloud.
- ```/play search``` Searches for a song from youtube and adds to queue.
- ```/play playlist``` Queues all songs from a playlist link from Youtube/Spotify/Soundcloud.
- ```/skip``` Skips the currently playing song.
- ```/skipto``` Skips to a certain song given from the queue's numbered list.
- ```/pause``` To halt the music.
- ```/resume``` To continue the music.
- ```/queue``` Lists out all songs queued from a playlist, can check multiple pages.
- ```/info``` Gives information on the currently playing song.
- ```/shuffle``` Mixes up the order of the current queue.
- ```/loop``` Set to [*on*] or [*off*] to allow the current song to continue looping over again.
- ```/quit``` Raiko quits the queue and leaves the VC.

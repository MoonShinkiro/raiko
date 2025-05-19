# Raiko Horikawa
A Discord music bot by MoonShinkiro  


![follow1852Arisu](https://user-images.githubusercontent.com/107448523/235394870-00964e3d-374c-44e6-9548-d1942fd9446f.png)

## Running
1. Acquire and copy your own bot token from https://discord.com/developers/applications/ and check the boxes ```bot``` and ```applications.commands``` from OAuth2 section. Make sure to add your bot to your server as well.
2. Run `git clone https://github.com/MoonShinkiro/raiko.git`
3. Run `npm install`
4. Open/edit the empty .env file and paste your bot token to ```TOKEN=```
5. In the folder where /raiko is located, run a terminal line with: ```node index.js load```
6. To load the commands into the bot, follow this step with: ```node index.js``` to start the bot.

## Commands
- ```/help``` Lists all commands and contact information for support.
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

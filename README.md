# obsidian_music
Personal project. Git repository synchronized with obsidian submodule to take up-to-date music list and display it on website in a random order while silencing ads.

## Steps to create
1. Create a repo that is linked to a submodule of the Obsidian repo.
   * Create one github action (via .github/workflows) that executes once a day to update the obsidian repository and push.
   * Create another github action (via .github/workflows) that executes on push to build the distributable version and deploy with github pages. 
4. Create a webpage that displays a random music video from obsidian’s music list consisting of links to music videos. Have a button to load another random video.
5. Also have the ability to skip adds automatically.
   * This does seem possible. However I was able to mute ads.
   * I wanted to automatically skip ads after 5 seconds and even refresh until such an ad is found. However, this does not seem possible.
6. If a video is unavailable due to embedding restrictions or ID extraction problems, display error message and wait 15 seconds before loading another video.
7. Maybe create different music options, such as recreational, engaged study or focused study.
8. Also handle a music playlist.
9. Use css to improve looks of website.
10. Create a button to go back to previous song.
11. Dislay song title during ads to know what song you are waiting for.

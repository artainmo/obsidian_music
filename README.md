# obsidian_music
Personal project. Git repository synchronized with obsidian submodule to take up-to-date music list and display it on website in a random order while automatically skipping ads.

## Steps to create
1. Create a repo that is linked to a submodule of the Obsidian repo.
   * Create one github action (via .github/workflows) that executes once a day to update the obsidian repository and push.
   * Create another github action (via .github/workflows) that executes on push to build the distributable version and deploy with github pages. 
4. Create a webpage that displays a random music video from obsidian’s music list consisting of links to music videos.
5. Also have the ability to skip adds automatically.
6. If a video is unavailable due to embedding restrictions or ID extraction problems, display error message and wait 15 seconds before loading another video.
7. Maybe create different music options, such as recreational, engaged study or focused study.
8. Also try to handle a music playlist.
9. Use css to improve looks of website.

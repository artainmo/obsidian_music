// List of video URLs
const videoLinks = [
    'https://www.youtube.com/watch?v=Ja9IUKElT5w',
    'https://www.youtube.com/watch?v=Z9iXlT8kMLc',
    'https://www.youtube.com/watch?v=bAVh9cFSnU0',
    'https://www.youtube.com/watch?v=CJxxaY9mNH4',
];

// Function to load a random video
function loadRandomVideo() {
    const videoPlayer = document.getElementById('videoPlayer');
    const videoSource = document.getElementById('videoSource');

    // Get a random index from the videoLinks array
    const randomIndex = 2;

    // Set the new video source
    videoSource.src = videoLinks[randomIndex];

    // Load the new video
    videoPlayer.load();
}

// Load a random video when the page first loads
window.onload = loadRandomVideo;

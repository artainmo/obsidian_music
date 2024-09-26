// List of video URLs
const videoLinks = [
    'Ja9IUKElT5w',
    'Z9iXlT8kMLc',
    'bAVh9cFSnU0',
    'CJxxaY9mNH4',
];

const music_file = `
`;

const study_file = `
`

let player;

// YouTube API will call this function when the iframe API is ready
function onYouTubeIframeAPIReady() {
    loadRandomVideo();  // Load a random video initially
}

// Function to load a random video
function loadRandomVideo() {
	const randomIndex = Math.floor(Math.random() * videoLinks.length);
    const videoId = videoLinks[randomIndex];

	// Hide error message
    document.getElementById('errorMessage').style.display = 'none';

    if (player) {
		// We use the loadVideoById(videoId) method to change the video when a random video is selected
        player.loadVideoById(videoId); 
    } else {
        // The YT.Player constructor creates an iframe that displays a YouTube video
        player = new YT.Player('player', {
            height: '450',
            width: '800',
            videoId: videoId,
            events: {
                'onStateChange': onPlayerStateChange,
				'onError': onPlayerError
            }
        });
    }
}

// This function triggers when the video state changes
function onPlayerStateChange(event) {
    // Check if the video ended
    if (event.data === YT.PlayerState.ENDED) {
        loadRandomVideo();  // Load a new random video when the previous one ends
    }
}

// This function triggers when there's an error
function onPlayerError(event) {
    // Show error message if embedding is not possible with the video
    if (event.data === 101 || event.data === 150) {
    	document.getElementById('errorMessage').style.display = 'flex';
    }
}

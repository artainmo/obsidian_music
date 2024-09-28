const study_file = `
`
const music_file = `
`;
let music_list = []
let engaged_study_list = []
let focused_study_list = []

function extractVideoID(url) {
	function extractPlaylistID(url) {
		// Regular expression to match the 'list' parameter in the URL
  		const regex = /[?&]list=([a-zA-Z0-9_-]+)/;
		// '[?&]': Looks for either ? or & preceding the list parameter.
		// 'list=': Matches the literal list= string in the URL.
  		// ([a-zA-Z0-9_-]+): Captures the playlist ID, which consists of alphanumeric characters, underscores, and hyphens.

  		// Check if the URL contains the 'list=' parameter
  		const match = url.match(regex);
  
  		// If found, return the playlist ID, otherwise return null
		console.log(`Playlist: ${match[1]}`)
  		return match ? match[1] : null;
	}
	if (url.includes("list=")) {
		return extractPlaylistID(url);
	}
  	// Regular expression to match YouTube video IDs from the two formats ('?v=' or '/shorts/')
  	const regex = /(?:\?v=|\/shorts\/)([a-zA-Z0-9_-]{11})/;
	//(?:\?v=|\/shorts\/): This is a non-capturing group that matches either '?v=' (for regular YouTube videos) or '/shorts/' (for YouTube Shorts URLs).
	//([a-zA-Z0-9_-]{11}): This captures the video ID, which is 11 characters long and can include letters (uppercase and lowercase), numbers, underscores (_), or hyphens (-).

	// Match the URL with the regex
	const match = url.match(regex);
	// The .match() method is used to search the URL for a match. If a match is found, the video ID is extracted from the first capturing group (i.e., match[1]).

	// If a match is found, return the video ID (first capturing group), else return null and print error
	return match ? match[1] : null;
}


function parse() {
	function parse_links(file) {
		// Split the content into lines
    	const lines = file.trim().split('\n');
		// Filter lines containing 'youtube.com'
		return lines.filter(line => line.includes('youtube.com'));
	}
	music_list = parse_links(music_file);
	const [focused_study_file, engaged_study_file] = study_file.split("engaging music is better for work motivation");
	engaged_study_list = parse_links(engaged_study_file);
	focused_study_list = parse_links(focused_study_file);
}

let player;
let mode = 'Recreational';
let bug = false;
let history = []

function setMode() {
	const dropdown = document.getElementById("dropdown");
	mode = dropdown.value;
	history = []
	player.mute()
	loadRandomVideo()
}

// YouTube API will call this function when the iframe API is ready
function onYouTubeIframeAPIReady() {
    loadRandomVideo();  // Load a random video initially
}

function previous_video() {
	if (history.length > 1) { history.pop(); }
	url = history.at(-1);
	video(extractVideoID(url), url);
}

// Function to load a random video
function loadRandomVideo() {
	bug = false;
	let music = music_list;
	if (mode === "Focused Study") {
		music = focused_study_list;	
	} else if (mode === "Engaged Study") {
		music = engaged_study_list;
	}
	const randomIndex = Math.floor(Math.random() * music.length);
    const videoId = extractVideoID(music[randomIndex]);
	history.push(music[randomIndex]);
    video(videoId, music[randomIndex]);
}

async function video(videoId, url) {
	// Hide error message
    document.getElementById('errorMessage1').style.display = 'none';
    document.getElementById('errorMessage2').style.display = 'none';
	if (videoId === null) {
		bug = true;
		console.log(`Error: could not extract ID of ${url}`)
    	document.getElementById('errorMessage2').style.display = 'flex';
		await new Promise(r => setTimeout(r, 15000));
		if (bug) {
			loadRandomVideo()
		}
		return ;
	}
    if (player) {
		if (!url.includes("list=")) {	
			// We use the loadVideoById(videoId) method to change the video when a random video is selected
        	player.loadVideoById(videoId); 
		} else {
			player.loadPlaylist({
        		list: videoId,  // Pass the playlist ID here
        		listType: 'playlist',  // Explicitly state the type of the list
        		index: 0,  // Start from the first video in the playlist
    		});
		}
	    document.getElementById('video_title').innerHTML = player.getVideoData().title; // Set video title to know what video you are waiting for during ads
    } else {
		if (!url.includes("list=")) {	
        	// The YT.Player constructor creates an iframe that displays a YouTube video
        	player = new YT.Player('player', {
            	height: '450',
            	width: '800',
            	videoId: videoId,
            	events: {
                	'onStateChange': onPlayerStateChange,
					'onError': onPlayerError,
			'onReady': function(event) { 
				event.target.mute(); // Mute the add for first video
				document.getElementById('video_title').innerHTML = event.target.getVideoData().title; // Set video title to know what video you are waiting for during ads
			} 
            	}
        	});
		} else {
			player = new YT.Player('player', {
        		height: '450',
        		width: '800',
        		playerVars: {
            		listType: 'playlist',
            		list: videoId
        		},
        		events: {
            		'onStateChange': onPlayerStateChange,
            		'onError': onPlayerError,
			'onReady': function(event) { 
				event.target.mute(); // Mute the add for first video
				document.getElementById('video_title').innerHTML = event.target.getVideoData().title; // Set video title to know what video you are waiting for during ads
			} 
        		}
    		});
		}
    }
}

function another_video() {
	player.mute();
	loadRandomVideo();
}

// This function triggers when the video state changes
function onPlayerStateChange(event) {
    // Check if the video ended
    if (event.data === YT.PlayerState.ENDED) {
	player.mute();  // Mute the ad
        loadRandomVideo();  // Load a new random video when the previous one ends
	return ;
    }

    // Unmute the video when the content starts playing
    if (event.data === YT.PlayerState.PLAYING && player.isMuted()) {
        player.unMute();  // Unmute the video once the content starts
	return ;
    }
}

// This function triggers when there's an error
async function onPlayerError(event) {
    // Show error message if embedding is not possible with the video
    if (event.data === 101 || event.data === 150) {
		bug = true;
    	document.getElementById('errorMessage1').style.display = 'flex';
		await new Promise(r => setTimeout(r, 15000));
		if (bug) {
			player.mute();  // Mute the ad
			loadRandomVideo()
		}
    }
}

parse();

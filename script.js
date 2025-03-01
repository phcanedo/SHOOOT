// Declare player variable
var player;
var videoPausedAt = false;  // Flag to track if the video has paused at 2 seconds

// This function is triggered when the YouTube API is ready and iframe is loaded
function onYouTubeIframeAPIReady() {
    player = new YT.Player('video-container', {
        height: '315',
        width: '560',
        videoId: 'g14m_uBxHhY',  // Video ID you provided
        playerVars: {
            autoplay: 1,  // Automatically start the video
            start: 0,     // Start the video at 0 seconds
            enablejsapi: 1 // Enable the API controls
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

// Function called when the YouTube player is ready
function onPlayerReady(event) {
    event.target.playVideo();  // Play the video immediately
    setTimeout(function() {
        event.target.pauseVideo();  // Pause the video at 2 seconds
        videoPausedAt = true;  // Set the flag
        document.getElementById('quiz').style.display = 'block';  // Show the quiz after the pause
    }, 2000);  // Wait 2 seconds before pausing the video
}

// Function to handle player state changes (Optional for debugging)
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.ENDED) {
        // Handle what happens when the video ends, if needed
    }
}

// Event listener for quiz answer selection
document.getElementById('quiz-answers').addEventListener('click', function(e) {
    if (e.target.tagName.toLowerCase() === 'li') {
        var selectedAnswer = e.target.getAttribute('data-answer');
        var result = document.getElementById('quiz-result');

        // Check if the answer is correct or incorrect
        if (selectedAnswer === '2') {
            result.textContent = 'Correct!';
        } else {
            result.textContent = 'Incorrect, try again!';
        }

        // Resume video from where it was paused
        if (videoPausedAt) {
            player.playVideo();
        }
    }
});

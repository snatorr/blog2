// Initialize variables
let track_name = document.querySelector(".songtitle");
let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");
let volume_slider = document.querySelector(".volume_slider");

let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create new audio element
let curr_track = document.getElementById("music");

// DEFINE YOUR SONGS HERE!!!!!
// MORE THAN FOUR SONGS CAN BE ADDED!!
// JUST ADD ANOTHER BRACKET WITH NAME AND PATH
// CATBOX.MOE IS RECOMMENDED FOR UPLOADING MP3 FILES
let track_list = [
    {
        name: "back on my feet - BOOM BOOM SATELLITES",
        path: "https://file.garden/Zztv0a9yEhr5pmEq/Back%20on%20My%20Feet%20(2017)%200.mp3"
    },
    {
        name: "HELLBLAU - GOATBED ",
        path: "https://file.garden/Zztv0a9yEhr5pmEq/HELLBLAU.mp3"
    },
    {
        name: "Dive for You - BOOM BOOM SATELLITES",
        path: "https://file.garden/Zztv0a9yEhr5pmEq/Dive%20for%20You%204.mp3"
    }
];

// The default volume of the song feel free to change
if (curr_track) {
    curr_track.volume = 0.1;
}

function setVolume() {
    // Set the volume according to the percentage of the volume slider set
    curr_track.volume = volume_slider.value / 100;
}

function loadTrack(track_index) {
    clearInterval(updateTimer);
    resetValues();

    // Load a new track
    curr_track.src = track_list[track_index].path;
    curr_track.load();

    // Update details of the track
    track_name.textContent = "playing " + (track_index + 1) + " of " + track_list.length + ": " + track_list[track_index].name;

    // Set an interval of 1000 milliseconds for updating the seek slider
    updateTimer = setInterval(seekUpdate, 1000);

    // Move to the next track if the current one finishes playing 
    curr_track.addEventListener("ended", nextTrack);
}

// Reset values
function resetValues() {
    curr_time.textContent = "0:00";
    total_duration.textContent = "0:00";
    seek_slider.value = 0;
}

// Checks if song is playing
function playpauseTrack() {
    if (!isPlaying) {
        playTrack();
    } else {
        pauseTrack();
    }
}

// Plays track when play button is pressed
function playTrack() {
    curr_track.play();
    isPlaying = true;

    // Replace icon with the pause icon
    playpause_btn.innerHTML = "<img class='ctrlimg' src='https://file.garden/Zztv0a9yEhr5pmEq/pause.png'></img>";
}

// Pauses track when pause button is pressed
function pauseTrack() {
    curr_track.pause();
    isPlaying = false;

    // Replace icon with the play icon
    playpause_btn.innerHTML = "<img class='ctrlimg' src='https://file.garden/Zztv0a9yEhr5pmEq/play.png'></img>";
}

// Moves to the next track
function nextTrack() {
    if (track_index < track_list.length - 1) {
        track_index += 1;
    } else {
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
}

// Moves to the previous track
function prevTrack() {
    if (track_index > 0) {
        track_index -= 1;
    } else {
        track_index = track_list.length - 1;
    }
    loadTrack(track_index);
    playTrack();
}

// Seeker slider
function seekTo() {
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}

function seekUpdate() {
    let seekPosition = 0;

    // Check if the current track duration is a legible number
    if (!isNaN(curr_track.duration)) {
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        // Calculate the time left and the total duration
        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        // Adding a zero to the single digit time values
        if (currentSeconds < 10) { 
            currentSeconds = "0" + currentSeconds; 
        }
        if (durationSeconds < 10) { 
            durationSeconds = "0" + durationSeconds; 
        }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}

// Wait for the document to be fully loaded before initializing
document.addEventListener("DOMContentLoaded", () => {
    loadTrack(track_index);
});
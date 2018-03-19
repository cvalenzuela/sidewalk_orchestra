// Controls: video, speed and start/stop tracking

import { sendCanvas } from './canvas2send';
import createCircle from './Circle';
import { changeLoop, loop, clearCanvas } from './sketch';
import { videos } from './const';

window.addEventListener("load", event => {
  const playPause = document.getElementById("playPause");
  const playPauseIcon = document.getElementById("playPauseIcon");
  const video = document.getElementById("video");
  const videoSpeed = document.getElementById("videoSpeed");
  const tracking = document.getElementById("tracking");
  const pixiCanvas = document.getElementById("pixiCanvas");

  video.playbackRate = 0.5;
  video.pause();
});

// Enable/Disable tracking
tracking.addEventListener("click", () => {
  changeLoop();
  if (loop) {
    sendCanvas();
  }
})

// Play/Pause the Video
playPause.addEventListener("click", () => {
  if (video.paused) {
    video.play();
    playPauseIcon.src = 'assets/svg/stop.svg';
  } else {
    video.pause();
    playPauseIcon.src = 'assets/svg/start.svg';
  }
});

// Video Speed
videoSpeed.addEventListener('change', () => {
  video.playbackRate = videoSpeed.value
});

// Change to next video
let currentVideo = 0;
changeVideo.addEventListener('click', () => {
  if (currentVideo < videos.length - 1) {
    currentVideo++;
  } else {
    currentVideo = 0
  }
  video.src = videos[currentVideo];
});

// On click in the window
pixiCanvas.addEventListener('dblclick', (e) => {
  createCircle(e.pageX, e.pageY);
});

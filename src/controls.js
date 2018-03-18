import { sendCanvas } from './canvas2send';

const playPause = document.getElementById("playPause");
const video = document.getElementById("video");
const videoSpeed = document.getElementById("videoSpeed");

// Play Pause
playPause.addEventListener("click", () => {
  if(video.paused){
    video.play();
  } else {
    video.pause();
  }
});

// Video Speed
videoSpeed.addEventListener('onmousemove', () => {
  console.log(videoSpeed.value)
})
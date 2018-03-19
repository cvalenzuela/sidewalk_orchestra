// Controls: video, speed and start/stop tracking

import Matter from 'matter-js';

import { sendCanvas } from './canvas2send';
import createRectangle, { world } from './Rectangle';
import { app, changeLoop, loop, clearCanvas, rectangles } from './sketch';
import { videos } from './const';
import { soundsA, soundsB, soundsC } from './sounds';

const map = (input, in_min, in_max, out_min, out_max) => Math.floor((input - in_min) * (out_max - out_min) / (in_max - in_min) + out_min)

let selectedInstrument = { 
  name: 'soundsA', 
  sounds: soundsA 
}

window.addEventListener("load", event => {
  const playPause = document.getElementById("playPause");
  const playPauseIcon = document.getElementById("playPauseIcon");
  const video = document.getElementById("video");
  const videoSpeed = document.getElementById("videoSpeed");
  const tracking = document.getElementById("tracking");
  const reset = document.getElementById("reset");
  const pixiCanvas = document.getElementById("pixiCanvas");
  const instrument1 = document.getElementById(`instrument1`);
  const instrument2 = document.getElementById(`instrument2`);
  const instrument3 = document.getElementById(`instrument3`);

  reset.addEventListener("click", () => {
    rectangles.removeChildren();
    Matter.World.clear(world, false);
  })

  instrument1.addEventListener("click", () => {
    soundsA[4].start();
    selectedInstrument.sounds = soundsA;
    selectedInstrument.name = 'soundsA';
  })

  instrument2.addEventListener("click", () => {
    soundsB[4].start();
    selectedInstrument.sounds = soundsB;
    selectedInstrument.name = 'soundsB';
  })

  instrument3.addEventListener("click", () => {
    soundsC[6].start();
    selectedInstrument.sounds = soundsC;
    selectedInstrument.name = 'soundsC';
  })


  video.playbackRate = 0.5;
  video.pause();


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
    createRectangle(e.pageX, e.pageY, map(e.pageY, 0, window.innerHeight, 0, 8));
  });

});

export {
  selectedInstrument,
  map
}
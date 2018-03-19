import Tone from 'tone';

// Load Sounds type A
export const soundsA = [];
for (let i = 1; i < 11; i++){
  soundsA.push(new Tone.Player({
    url: `./src/mp3/a/${i}.mp3`,
    retrigger: false
  }).toMaster())
}

// Load Sounds type A
export const soundsB = [];
for (let i = 1; i < 9; i++){
  soundsA.push(new Tone.Player({
    url: `./src/mp3/b/${i}.mp3`,
    retrigger: false
  }).toMaster())
}

// Load the street sound
const street = new Tone.Player({
  url: `./src/mp3/nyc.mp3`,
  retrigger: false
}).toMaster()

street.loop = true;
street.volume.value = -15;
street.autostart = true;

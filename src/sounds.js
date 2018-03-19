import Tone from 'tone';

// Load Sounds type A
export const soundsA = [];
for (let i = 1; i < 9; i++){
  soundsA.push(new Tone.Player({
    url: `./src/mp3/c/${i}.mp3`,
    retrigger: false
  }).toMaster())
}

// Load Sounds type B
export const soundsB = [];
for (let i = 1; i < 9; i++){
  soundsB.push(new Tone.Player({
    url: `./src/mp3/d/${i}.mp3`,
    retrigger: false
  }).toMaster())
}

// Load Sounds type C
export const soundsC = [];
for (let i = 1; i < 9; i++){
  soundsC.push(new Tone.Player({
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

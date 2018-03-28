
import { SIZE } from './const';
import { sendData } from './socket';

const video = document.getElementById('video');
const canvas2send = document.getElementById('canvas2send');
const context = canvas2send.getContext('2d');

const updateCanvas2send = () => {
  context.drawImage(video, 0, 0, SIZE.width, SIZE.height);
}

let start_ms = 0;

const sendCanvas = (start_ms) => {
  start_ms = Date.now();
  console.log('-------------------------------');
  console.log('1) About to send new canvas:', (Date.now() - start_ms) / 1000);
  sendData(canvas2send.toDataURL("image/jpg"), start_ms);
  console.log('4) New canvas sent!', (Date.now() - start_ms) / 1000);
}

export {
  updateCanvas2send,
  canvas2send,
  sendCanvas
}

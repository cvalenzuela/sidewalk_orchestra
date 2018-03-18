
import { SIZE } from './const';
import { sendData } from './socket';

const video = document.getElementById('video');
const canvas2send = document.getElementById('canvas2send');
const context = canvas2send.getContext('2d');

const updateCanvas2send = () => {
  context.drawImage(video, 0, 0, SIZE.width, SIZE.height);
}

const sendCanvas = () => {
  sendData(canvas2send.toDataURL("image/jpg"));
}

export {
  updateCanvas2send,
  canvas2send,
  sendCanvas
}

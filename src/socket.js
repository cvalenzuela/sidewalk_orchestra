// Manage socket connection

import io from 'socket.io-client';
import { sendCanvas } from './canvas2send';
import { drawHuman, clearCanvas } from './sketch';

const socket = io.connect('http://64.62.141.30:33000/query');

let start_ms = 0;

socket.on('connect', () => {
  log.innerHTML = 'connected';
});
socket.on('update_response', (data) => {
  clearCanvas();
  const total = data.results.humans.length;
  if (total > 0) {
    data.results.humans.forEach((human, index) => drawHuman(human, total, index, start_ms));
  } else {
    sendCanvas();
  }
});

const sendData = (img, current) => {
  start_ms = current
  socket.emit('update_request', {
    data: img,
    model: 'mobilenet_thin'
  });
}

export {
  sendData,
}
// Manage socket connection

import io from 'socket.io-client';
import { sendCanvas } from './canvas2send';
import { drawHuman, clearCanvas } from './sketch';

const socket = io.connect('http://64.62.141.30:33000/query');
socket.on('connect', () => {
  log.innerHTML = 'connected';
});
socket.on('update_response', (data) => {
  clearCanvas();
  const total = data.results.humans.length;
  if (total > 0) {
    data.results.humans.forEach((human, index) => drawHuman(human, total, index));
  } else {
    sendCanvas();
  }
});

const sendData = img => {
  socket.emit('update_request', {
    data: img,
    model: 'mobilenet_thin'
  });
}

export {
  sendData,
}
// Manage socket connection

import io from 'socket.io-client';
import { sendCanvas } from './canvas2send';
import { drawHuman, clearCanvas, drawCircles } from './sketch';

const socket = io.connect('http://localhost:33000/query');
socket.on('connect', () => {
  log.innerHTML = 'connected';
});
socket.on('update_response', (data) => {
  if (data.results.humans.length > 0) {
    clearCanvas();
    data.results.humans.forEach(human => drawHuman(human));
    //data.results.humans.forEach(human => drawCircles(human));
  }
  sendCanvas();
});

const sendData = img => {
  socket.emit('update_request', {
    data: img,
    model: 'mobilenet_thin'
  });
}

export {
  sendData
}
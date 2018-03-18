// Pixi Sketch

import * as PIXI from 'pixi.js';

import { startVideo } from './video';
import { CONNECTIONS, SIZE } from './const';
import { updateCanvas2send } from './canvas2send';

const fullWidth = window.innerWidth;
const fullHeight = window.innerHeight;

const OPTIONS = {
  antialias: true,
  width: fullWidth,
  height: fullHeight, 
  resolution: 1,
  smoothProperty: true,
}

// App & Renderer
const canvas2show = new PIXI.Application(OPTIONS);
const container = new PIXI.Container();
const graphics = new PIXI.Graphics();
const videoTexture = new PIXI.Texture.fromVideo(document.getElementById('video'));
// startVideo();

// Create a new Sprite using the video texture
const videoSprite = new PIXI.Sprite(videoTexture);

const init = () => {
  requestAnimationFrame(animate);
  container.addChild(graphics);
  canvas2show.stage.addChild(videoSprite);
  canvas2show.stage.addChild(container);
  videoSprite.width = fullWidth;
  videoSprite.height = fullHeight;
}

const animate = () => {
  requestAnimationFrame(animate);
  updateCanvas2send();
  canvas2show.renderer.render(canvas2show.stage);
}

const circle = (x, y) => {
  graphics.lineStyle(0);
  graphics.beginFill(0xFF0000, 1);
  graphics.drawCircle(x, y, 10);
  graphics.endFill();
}

const line = (x1, y1, x2, y2) => {
  graphics.lineStyle(4, 0xff0000aa, 1);
  graphics.moveTo(x1, y1);
  graphics.lineTo(x2, y2);
}

const clearCanvas = () => {
  graphics.clear();
}

const drawHuman = human => {
  CONNECTIONS.forEach((connection, i) => {
    let start = null;
    let end = null;
    human.forEach(bodyPart => {
      const name = bodyPart[0];
      if (name === connection[0]) {
        start = bodyPart;
      } else if (name === connection[1]) {
        end = bodyPart;
      }
    });
    if (start && end) {
      line(start[1] * fullWidth, start[2] * fullHeight, end[1] * fullWidth, end[2] * fullHeight);
    }
  });
}

const drawCircles = human => {
  human.forEach(bodyPart => {
    circle(bodyPart[1] * fullWidth, bodyPart[2] * fullHeight);
  });
}

init();
document.body.appendChild(canvas2show.renderer.view);

export {
  canvas2show,
  drawHuman,
  drawCircles,
  clearCanvas,
}
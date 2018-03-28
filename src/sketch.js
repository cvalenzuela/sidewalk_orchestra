// Pixi Sketch

import * as PIXI from 'pixi.js';
import Matter from 'matter-js';
import TWEEN from '@tweenjs/tween.js';

import { startWebcam } from './webcam';
import { CONNECTIONS, SIZE } from './const';
import { updateCanvas2send, sendCanvas } from './canvas2send';
import { world } from './Rectangle';

const fullWidth = window.innerWidth;
const fullHeight = window.innerHeight;

let loop = false;

const OPTIONS = {
  antialias: true,
  width: fullWidth,
  height: fullHeight, 
  resolution: 1,
  transparent: true,
  legacy:true,
  forceCanvas: true
}

const doneDrawing = true;

// App & Renderer
const app = new PIXI.Application(OPTIONS);
app.view.id = 'pixiCanvas'
const container = new PIXI.Container();
const rectangles = new PIXI.Container();
const graphics = new PIXI.Graphics();
const videoTexture = new PIXI.Texture.fromVideo(document.getElementById('video'));
// startWebcam();

// Create a new Sprite using the video texture
const videoSprite = new PIXI.Sprite(videoTexture);

const init = () => {
  requestAnimationFrame(animate);
  container.addChild(graphics);
  app.stage.addChild(videoSprite);
  app.stage.addChild(container);
  app.stage.addChild(rectangles);
  videoSprite.width = fullWidth;
  videoSprite.height = fullHeight;
}

const animate = () => {
  requestAnimationFrame(animate);
  updateCanvas2send();
  TWEEN.update();
  app.renderer.render(app.stage);
}

const circle = (x, y) => {
  graphics.lineStyle(0);
  graphics.beginFill(0xFF0000, 1);
  graphics.drawCircle(x, y, 10);
  graphics.endFill();
}

const line = (x1, y1, x2, y2) => {
  graphics.lineStyle(3, 0xFFFFFF, 1);
  graphics.moveTo(x1, y1);
  graphics.lineTo(x2, y2);
}

const clearCanvas = () => {
  graphics.clear();
}

const drawHuman = (human, totalHumans, humanIndex, start_ms) => {
  CONNECTIONS.forEach((connection, connectionIndex) => {
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
      const x1 = start[1] * fullWidth;
      const y1 = start[2] * fullHeight;
      const x2 = end[1] * fullWidth;
      const y2 = end[2] * fullHeight;
      line(x1, y1, x2, y2);
      playOnCollision(x1, y1, x2, y2);
    }
    // Once looped over all humans and all possible connections, send canvas again
    if(totalHumans === humanIndex + 1 && CONNECTIONS.length === connectionIndex + 1 ) {
      if (loop) {
        sendCanvas(start_ms)
      } else {
        clearCanvas();
      }
    }
  });
}

const changeLoop = () => {
  loop = !loop;
}

const playOnCollision = (x1, y1, x2, y2) => {
  world.bodies.forEach(body => {
    const collision1 = Matter.Query.point(world.bodies, {x: x1, y: y1});
    const collision2 = Matter.Query.point(world.bodies, {x: x2, y: y2});
    collision1.forEach(e => e.pixiRectangle.playCollision());
  })
}

const drawCircles = human => {
  human.forEach(bodyPart => {
    circle(bodyPart[1] * fullWidth, bodyPart[2] * fullHeight);
  });
}

const checkForCollision = (x1, y1, x2, y2) => {
  Matter.Detector.canCollide(filterA, filterB)
}

init();
document.body.appendChild(app.renderer.view);

export {
  app,
  loop,
  doneDrawing,
  drawHuman,
  drawCircles,
  clearCanvas,
  changeLoop,
  rectangles
}
import * as PIXI from 'pixi.js';
import Matter from 'matter-js';
import TWEEN from '@tweenjs/tween.js';

import { app } from './sketch';
import { soundsA } from './sounds';

const engine = new Matter.Engine.create();
const world = engine.world;
Matter.Engine.run(engine);

const redCircle = PIXI.Texture.fromImage('./assets/png/1.png');
redCircle.baseTexture.scaleMode = PIXI.SCALE_MODES.LINEAR;

class Circle {
  constructor(x, y, updatePos) {
    this.circle = new PIXI.Sprite(redCircle);
    this.circle.updatePos = updatePos;
    this.circle.interactive = true;
    this.circle.buttonMode = true;
    this.circle.anchor.set(0.5);
    this.circle.scale.set(0.1);
    this.playing = false;
    this.options = { scale: 0.1 };
    this.circle
      .on('pointerdown', this.onDragStart)
      .on('pointerup', this.onDragEnd)
      .on('pointerupoutside', this.onDragEnd)
      .on('pointermove', this.onDragMove);

    this.sound = soundsA[0];
    this.sound.start();
    this.circle.x = x;
    this.circle.y = y;
    app.stage.addChild(this.circle);
    this.playCollision();
  }

  playCollision() {
    if (!this.playing) {
      this.playing = true;
      this.sound.start();
      new TWEEN.Tween(this.options)
        .to({ scale: 0.25 }, 500)
        .repeat(1)
        .delay(0)
        .yoyo(true)
        .easing(TWEEN.Easing.Exponential.Out)
        .onUpdate(() => {
          this.circle.scale.set(this.options.scale);
        })
        .start()
        .onComplete(() => {
          this.playing = false;
        });
    }
  }

  onDragStart(event){
    this.data = event.data;
    this.alpha = 0.5;
    this.dragging = true;
  }

  onDragEnd() {
    this.alpha = 1;
    this.dragging = false;
    this.data = null;
  }

  onDragMove() {
    if (this.dragging) {
      const newPosition = this.data.getLocalPosition(this.parent);
      this.x = newPosition.x;
      this.y = newPosition.y;
      this.updatePos(this.x, this.y);
    }
  }
}

const createCircle = (x, y) => {
  const matterCircle = Matter.Bodies.circle(x, y, 40, { isStatic: true });
  const updatePos = (x, y) => Matter.Body.setPosition(matterCircle, { x, y })
  matterCircle.pixiCircle = new Circle(x, y, updatePos);
  Matter.World.add(world, matterCircle);
}

export default createCircle;

export {
  world
}
import * as PIXI from 'pixi.js';
import Matter from 'matter-js';
import TWEEN from '@tweenjs/tween.js';

import { app, rectangles } from './sketch';
import { soundsA } from './sounds';
import { selectedInstrument, map } from './controls';

const engine = new Matter.Engine.create();
const world = engine.world;
Matter.Engine.run(engine);

const instrument1 = PIXI.Texture.fromImage('./assets/png/1.png');
const instrument2 = PIXI.Texture.fromImage('./assets/png/2.png');
const instrument3 = PIXI.Texture.fromImage('./assets/png/3.png');
instrument1.baseTexture.scaleMode = PIXI.SCALE_MODES.LINEAR;
instrument2.baseTexture.scaleMode = PIXI.SCALE_MODES.LINEAR;
instrument3.baseTexture.scaleMode = PIXI.SCALE_MODES.LINEAR;

class Rectangle {
  constructor(x, y, updatePos, soundPos) {
    if(selectedInstrument.name === 'soundsA'){
      this.rectangle = new PIXI.Sprite(instrument1);
    } else if (selectedInstrument.name === 'soundsB') {
      this.rectangle = new PIXI.Sprite(instrument2);
    } else {
      this.rectangle = new PIXI.Sprite(instrument3);
    }

    this.rectangle.updatePos = updatePos;
    this.rectangle.interactive = true;
    this.rectangle.buttonMode = true;
    this.rectangle.anchor.set(0.5);
    this.rectangle.scale.set(0.2);
    this.playing = false;
    this.options = { scale: 0.2 };
    this.rectangle
      .on('pointerdown', this.onDragStart)
      .on('pointerup', this.onDragEnd)
      .on('pointerupoutside', this.onDragEnd)
      .on('pointermove', this.onDragMove);

    this.instrument = selectedInstrument.sounds
    this.sound = this.instrument[soundPos];
    this.sound.start();
    this.rectangle.x = x;
    this.rectangle.y = y;
    rectangles.addChild(this.rectangle)
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
          this.rectangle.scale.set(this.options.scale);
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

const createRectangle = (x, y, soundPos) => {
  const matterRectangle = Matter.Bodies.rectangle(x, y, 60, 70, { isStatic: true });
  const updatePos = (x, y) => Matter.Body.setPosition(matterRectangle, { x, y })
  matterRectangle.pixiRectangle = new Rectangle(x, y, updatePos, soundPos);
  Matter.World.add(world, matterRectangle);
}

export default createRectangle;

export {
  world
}
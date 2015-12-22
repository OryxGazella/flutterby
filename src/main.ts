import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {ScreenComponent} from './ScreenComponent'
import renderScene from './renderFunctions'
import {UserControlStream, Action, Controls} from "./usercontrols";
import Rx = require('rx')

const tileWidth = 8;
const initialScene = {
  butterfly: {
    id: 'butterfly',
    x: 256 - 32,
    y: 256 + 96,
  },
  laser: {
    id: 'laser',
    x: 256 - 32 + 24,
    y: 112 + 96 * 2
  }
}

function offset(controls:Controls, action:Action, offset:number):number {
  return controls[Action[action]] ? offset : 0
}

UserControlStream
  .combineLatest(Rx.Observable.interval(16), (c:Controls, t) => [c, t])
  .sample(16)
  .scan((scene, [controls, tick]) => ({
    butterfly: {
      id: scene.butterfly.id,
      x: scene.butterfly.x + offset(controls, Action.MoveRight, tileWidth) + offset(controls, Action.MoveLeft, -tileWidth),
      y: scene.butterfly.y + offset(controls, Action.MoveUp, -tileWidth) + offset(controls, Action.MoveDown, tileWidth),
    },
    laser: {
      id: scene.laser.id,
      x: scene.laser.x,
      y: scene.laser.y < -256 ? (112 + 96 * 2) : (scene.laser.y - (tick % 26))
    }
  }), initialScene)
  .startWith(initialScene)
  .subscribe(scene => {
    renderScene([scene.butterfly, scene.laser])
  })

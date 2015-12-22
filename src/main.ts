import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {ScreenComponent} from './ScreenComponent'
import renderScene from './renderFunctions'
import {UserControlStream, Action, Controls} from "./usercontrols";
import Rx = require('rx')

const tileWidth = 8;
const initialButterfly = {
  id: 'butterfly',
  x: 256 - 32,
  y: 256 - 32,
}

function offset(controls:Controls, action:Action,offset:number):number {
  return controls[Action[action]] ? offset : 0
}

UserControlStream
  .combineLatest(Rx.Observable.interval(16), Rx.helpers.identity)
  .sample(16)
  .scan((b, controls) => ({
    id: b.id,
    x: b.x + offset(controls, Action.MoveRight, tileWidth) + offset(controls, Action.MoveLeft, -tileWidth),
    y: b.y + offset(controls, Action.MoveUp, -tileWidth) + offset(controls, Action.MoveDown, tileWidth),
  }), initialButterfly)
  .startWith(initialButterfly)
  .subscribe(b => {
    renderScene([b])
  })

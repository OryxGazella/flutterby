import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {UserControlStream} from './usercontrols'
import {ScreenComponent} from './ScreenComponent'
import renderScene from './renderFunctions'
import {Action} from "./usercontrols";
import Rx = require('rx')
import Observable = Rx.Observable;

const tileWidth = 32;
const initialButterfly = {
  id: 'butterfly',
  x: 0,
  y: 0,
}

function offset(action:Action, applicableAction:Action,offset:number):number {
  return action === applicableAction ? offset : 0
}

UserControlStream
  .scan((b, action) => ({
    id: b.id,
    x: b.x + offset(action, Action.MoveRight, tileWidth) + offset(action, Action.MoveLeft, -tileWidth),
    y: b.y + offset(action, Action.MoveUp, -tileWidth) + offset(action, Action.MoveDown, tileWidth),

  }), initialButterfly)
  .startWith(initialButterfly)
  .sample(100)
  .subscribe(b => {
    renderScene([b])
  })

import 'mousetrap'

import {Observable, Subject} from 'rx'

function bindKey(key):Subject<string> {
  let sub = new Subject<string>()
  Mousetrap.bind(key, () => {
    sub.onNext(key)
  })
  return sub
}

export enum Action {
  MoveLeft,
  MoveRight,
  MoveUp,
  MoveDown,
  Fire
}

export const UserControlStream:Observable<Action> = Observable.merge(
  bindKey('space'),
  bindKey('left'),
  bindKey('right'),
  bindKey('down'),
  bindKey('up'))
  .map(eventString => {
    if(eventString === 'up') return Action.MoveUp
    if(eventString === 'down') return Action.MoveDown
    if(eventString === 'left') return Action.MoveLeft
    if(eventString === 'right') return Action.MoveRight
    if(eventString === 'space') return Action.Fire
    return null
  })
  .filter(key => key != null)

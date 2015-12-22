import {Observable} from 'rx'

export enum Action {
  MoveLeft = 37,
  MoveRight = 39,
  MoveUp = 38,
  MoveDown = 40,
  Fire = 32
}

export interface Controls {
  MoveLeft:boolean,
  MoveRight:boolean,
  MoveUp:boolean,
  MoveDown:boolean,
  Fire:boolean
}

const initialKeys = {
  [Action[Action.MoveDown]]: false,
  [Action[Action.MoveLeft]]: false,
  [Action[Action.MoveRight]]: false,
  [Action[Action.MoveUp]]: false,
  [Action[Action.Fire]]: false,
};

export const UserControlStream:Observable<Controls> = Observable.merge(
  Observable.fromEvent(document, 'keydown'),
  Observable.fromEvent(document, 'keyup'))
  .distinctUntilChanged((evt:KeyboardEvent) => (evt.key || evt.keyCode + evt.type))
  .filter((e:KeyboardEvent) => Action[e.key || e.keyCode] != null)
  .scan((acc, event:KeyboardEvent) => {
    acc[Action[event.key || event.keyCode]] = event.type === 'keydown'
    return acc
  }, initialKeys)
  .startWith(initialKeys)

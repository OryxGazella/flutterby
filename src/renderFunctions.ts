import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {ScreenComponent} from "./ScreenComponent"
import DOMElement = __React.DOMElement;

function makeElement(node:ScreenComponent):DOMElement<any> {
  return React.DOM.div({
    className: node.id,
    key: node.id,
    style: {
      transform: `translate3d(${node.x}px, ${node.y}px, 0)`
    }
  })
}

export default function renderScene(nodes:Array<ScreenComponent>) {
  ReactDOM.render(
    React.DOM.div(null, nodes.map(makeElement)),
    document.getElementById('canvas')
  )
}

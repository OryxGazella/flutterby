import Rx from 'rx-dom'
import UserControlStream from './usercontrols'
import React from 'react'
import ReactDOM from 'react-dom'

UserControlStream.subscribe(e => {console.log(e)})

function makeElement(node) {
    return React.DOM.div({
        className: node.id,
        key: node.id,
        style: {
            left: Math.floor(node.x + (node.baseX || 0)) + "px",
            top: Math.floor(node.y + (node.baseY || 0)) + "px"
        }
    })
}

function renderScene(nodes) {
    return ReactDOM.render(
        React.DOM.div(null, nodes.map(makeElement)),
        canvas
    )
}

function isDirectionalControlKey() {
    return k => k === 'right'
    || k === 'left'
    || k === 'up'
    || k === 'down'
}
const initialButterfly = {
    id: 'butterfly',
    x: 60,
    y: 0,
    baseY: 300
};
UserControlStream
    .filter(isDirectionalControlKey())
    .scan(({id: id, x: x, y: y, baseY: baseY}, key) => {
        return {
            id: id,
            x:
                key === 'right' ? x + 50 :
                key === 'left' ? x - 50 : x,
            y:
                key === 'up' ? y - 50 :
                key === 'down' ? y + 50 : y,
            baseY: baseY
        }
    }, initialButterfly)
    .startWith(initialButterfly)
    .sample(17)
    .subscribe(b => {renderScene([b])})
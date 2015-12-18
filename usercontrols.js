const Mousetrap = require('mousetrap')

function bindKey(key) {
    //noinspection JSClosureCompilerSyntax
    let sub = new Rx.Subject()
    Mousetrap.bind(key, () => {
        sub.onNext(key)
    })
    return sub
}

const UserControlStream = Rx.Observable.merge(bindKey('space'), bindKey('left'), bindKey('right'), bindKey('down'), bindKey('up'))
export default UserControlStream

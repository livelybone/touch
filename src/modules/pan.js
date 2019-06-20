import { Observer } from '@livelybone/simple-observer'
import argsDeal from '../args-deal'
import capitalize from '../capitalize'
import { assign } from '../utils'
import bind from './bind'

function pan(el, callback, preventFn) {
  var touchSubject = bind(el, preventFn)

  var observer = new Observer(function(ev) {
    var valid = ev.touches.length === 1
    if (!valid) return
    callback(assign(ev, { type: 'pan' + capitalize(ev.type.replace('touch', '')) }))
  })

  touchSubject.subject.addObserver(observer)

  return function unbind() {
    touchSubject.subject.removeObserver(observer)
    observer = undefined

    if (touchSubject.subject.getObserversCount() < 1) {
      touchSubject.unbind()
    }
  }
}

export default argsDeal(pan)
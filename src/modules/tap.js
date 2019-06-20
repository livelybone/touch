import { Observer } from '@livelybone/simple-observer'
import argsDeal from '../args-deal'
import { assign } from '../utils'
import bind from './bind'

function tap(el, callback, preventFn) {
  var timestamp = 0
  var touchSubject = bind(el, preventFn)

  var observer = new Observer(function(ev) {
    var valid = ev.touches.length === 1
    if (!valid) return
    if (ev.type === 'touchstart') {
      timestamp = ev.timeStamp
    } else if (ev.type === 'touchend') {
      if (ev.timeStamp - timestamp > 250) return

      if (ev.centerDelta.deltaDistance > 10 / ev.centerDelta.windowScale) return
      callback(assign(ev, { type: 'tap' }))
    }
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

export default argsDeal(tap)

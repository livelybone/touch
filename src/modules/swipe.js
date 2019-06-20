import { Observer } from '@livelybone/simple-observer'
import argsDeal from '../args-deal'
import { assign } from '../utils'
import bind from './bind'

function swipe(el, callback, preventFn) {
  var timestamp = 0
  var touchSubject = bind(el, preventFn)

  var observer = new Observer(function(ev) {
    var valid = ev.touches.length === 1 && ev.touches[0]
    if (!valid) return

    if (ev.type === 'touchstart') {
      timestamp = ev.timeStamp
    } else if (ev.type === 'touchend') {
      if (ev.timeStamp - timestamp > 250) return

      var deltaObj = ev.centerDelta
      if (deltaObj.direction) callback(assign(ev, { type: 'swipe', swipeTo: deltaObj.direction }))
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

export default argsDeal(swipe)
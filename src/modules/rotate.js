import { Observer } from '@livelybone/simple-observer'
import argsDeal from '../args-deal'
import capitalize from '../capitalize'
import { assign } from '../utils'
import bind from './bind'

function rotate(el, callback, preventFn) {
  var endCount = 0
  var touchSubject = bind(el, preventFn)

  var observer = new Observer(function(ev) {
    if (ev.type === 'touchend' && endCount === 0) {
      callback(assign(ev, { type: 'rotateEnd' }))
      endCount++
      return
    }
    var valid = ev.touches.length >= 2
    if (!valid) return
    callback(assign(ev, { type: 'rotate' + capitalize(ev.type.replace('touch', '')) }))
    endCount = 0
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

export default argsDeal(rotate)
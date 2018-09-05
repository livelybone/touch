import argsDeal from '../args-deal'
import capitalize from '../capitalize'
import assign from '../merge-obj'
import bind from './bind'

function rotate(el, callback, preventRule) {
  var res = bind(el, preventRule)
  var endCount = 0

  return {
    unsubscribe: res.Observer.subscribe(function (ev) {
      if (ev.type === 'touchend' && endCount === 0) {
        callback(assign(ev, { type: 'rotateEnd' }))
        endCount++
        return
      }
      var valid = ev.touches.length >= 2
      if (!valid) return
      callback(assign(ev, { type: 'rotate' + capitalize(ev.type.replace('touch', '')) }))
      endCount = 0
    }).unsubscribe,
    touchObserver: res
  }
}

export default argsDeal(rotate)
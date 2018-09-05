import argsDeal from '../args-deal'
import assign from '../merge-obj'
import bind from './bind'

function press(el, callback, preventRule) {
  var res = bind(el, preventRule)
  var timestamp = 0

  return {
    unsubscribe: res.Observer.subscribe(function (ev) {
      var valid = ev.touches.length === 1
      if (!valid) return

      if (ev.type === 'touchstart') {
        timestamp = ev.timeStamp
      } else if (ev.type === 'touchend') {
        if (ev.timeStamp - timestamp <= 250) return

        if (ev.centerDelta.deltaDistance > 10 / ev.centerDelta.windowScale) return
        callback(assign(ev, { type: 'press' }))
      }
    }).unsubscribe,
    touchObserver: res
  }
}

export default argsDeal(press)

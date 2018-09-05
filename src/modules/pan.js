import argsDeal from '../args-deal'
import capitalize from '../capitalize'
import assign from '../merge-obj'
import bind from './bind'

function pan(el, callback, preventRule) {
  var res = bind(el, preventRule)

  return {
    unsubscribe: res.Observer.subscribe(function (ev) {
      var valid = ev.touches.length === 1
      if (!valid) return
      callback(assign(ev, { type: 'pan' + capitalize(ev.type.replace('touch', '')) }))
    }).unsubscribe,
    touchObserver: res
  }
}

export default argsDeal(pan)
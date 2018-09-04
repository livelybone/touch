var bind = require('./bind')
var assign = require('../merge-obj')
var capitalize = require('../capitalize')

function pinch(el, callback, preventRule) {
  var res = bind(el, preventRule)
  var endCount = 0

  return {
    unsubscribe: res.Observer.subscribe(function (ev) {
      if (ev.type === 'touchend' && endCount === 0) {
        callback(assign(ev, { type: 'pinchEnd' }))
        endCount++
        return
      }
      var valid = ev.touches.length >= 2
      if (!valid) return
      callback(assign(ev, { type: 'pinch' + capitalize(ev.type.replace('touch', '')) }))
      endCount = 0
    }).unsubscribe,
    touchObserver: res
  }
}
export default require('../args-deal')(pinch)
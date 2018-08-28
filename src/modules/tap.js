var bind = require('./bind')
var assign = require('../merge-obj')

function tap(el, callback, preventRule) {
  var res = bind(el, preventRule)
  var timestamp = 0

  return {
    unsubscribe: res.Observer.subscribe(function (ev) {
      var valid = ev.touches.length === 1
      if (!valid) return
      if (ev.type === 'touchstart') {
        timestamp = ev.timeStamp
      } else if (ev.type === 'touchend') {
        if (ev.timeStamp - timestamp > 250) return

        if (ev.centerDelta.deltaDistance > 10 / ev.centerDelta.windowScale) return
        callback(assign(ev, { type: 'tap' }))
      }
    }).unsubscribe,
    touchObserver: res
  }
}

module.exports = require('../args-deal')(tap)

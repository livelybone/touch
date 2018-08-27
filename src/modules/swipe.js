var bind = require('./bind')
var assign = require('../merge-obj')

function swipe(el, callback) {
  var res = bind(el)
  var timestamp = 0

  return {
    unsubscribe: res.Observer.subscribe(function (ev) {
      var valid = ev.touches.length === 1 && ev.touches[0]
      if (!valid) return

      if (ev.type === 'touchstart') {
        timestamp = ev.timeStamp
      } else if (ev.type === 'touchend') {
        if (ev.timeStamp - timestamp > 250) return

        var deltaObj = ev.centerDelta
        if (deltaObj.direction) callback(assign(ev, { type: 'swipe', swipeTo: deltaObj.direction }))
      }
    }).unsubscribe,
    touchObserver: res
  }
}

module.exports = require('../args-deal')(swipe)
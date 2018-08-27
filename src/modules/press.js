var bind = require('./bind')
var assign = require('../merge-obj')

function press(el, callback) {
  var timestamp = 0

  return bind(el).Observer.subscribe(function (ev) {
    var valid = ev.touches.length === 1
    if (!valid) return

    if (ev.type === 'touchstart') {
      timestamp = ev.timeStamp
    } else if (ev.type === 'touchend') {
      if (ev.timeStamp - timestamp <= 250) return

      if (ev.centerDelta.distance > 10 / ev.centerDelta.scale) return
      callback(assign(ev, { type: 'press' }))
    }
  })
}

module.exports = require('../args-deal')(press)
